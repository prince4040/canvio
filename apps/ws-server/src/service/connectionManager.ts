import type { UserRoleType } from "@canvio/util/auth";
import { withCatch } from "@canvio/util/withCatch";
import {
	type AknowlegementSchemaType,
	type ErrorMessagePayloadSchemaType,
	type IncomingMessageSchemType,
	incomingMessageSchema,
	type JoinRoonSchemaType,
} from "@canvio/util/ws";
import { WebSocket } from "ws";
import { db } from "../db";
import { roomSockets, sockets, userSockets } from "./../store/data";
import type { UserConnection, UserId } from "../types";
import { isValidRequestId } from "../utils";

export class ConnectionManger {
	private socket: WebSocket;
	private userId: UserId;

	constructor(socket: WebSocket, userId: UserId) {
		this.socket = socket;
		this.userId = userId;
		this.init();
	}

	private addConnection() {
		const socketId = crypto.randomUUID();
		const connection: UserConnection = {
			socketId,
			userId: this.userId,
			socket: this.socket,
			rooms: new Set(),
			isAlive: true,
			createAt: new Date(),
		};
		sockets.set(socketId, connection);

		if (!userSockets.has(this.userId)) {
			userSockets.set(this.userId, new Set());
		}

		userSockets.get(this.userId)?.add(socketId);

		return socketId;
	}

	public init() {
		// handle connection
		const socketId = this.addConnection();

		this.socket.on("message", async (rawData) => {
			const [parseError, data] = await withCatch(
				JSON.parse(rawData.toString()),
			);
			let requestId: string | undefined;

			if (isValidRequestId(data)) {
				requestId = data.payload.requestId;
			}

			if (parseError) {
				this.sendError({
					code: "ERR_INVALID_FORMAT",
					message: "invalid json format",
					requestId,
				});
				return;
			}

			const parsedResult = incomingMessageSchema.safeParse(data);

			if (!parsedResult.success) {
				this.sendError({
					code: "ERR_INVALID_FORMAT",
					message: parsedResult.error.message,
					requestId,
				});
				return;
			}

			const parsedData = parsedResult.data;
			this.handleIncomingMessage(parsedData, socketId, requestId);
		});
	}

	private handleIncomingMessage(
		data: IncomingMessageSchemType,
		socketId: string,
		requestId?: string,
	) {
		switch (data.type) {
			case "ROOM.JOIN":
				this.handleJoinRoom(data, socketId, requestId);
				break;
			case "ROOM.LEAVE":
				break;
		}
	}

	private addSocketToRoom(roomId: string, socketId: string) {
		if (!roomSockets.has(roomId)) {
			roomSockets.set(roomId, new Set());
		}

		roomSockets.get(roomId)?.add(socketId);
	}

	private async handleJoinRoom(
		data: JoinRoonSchemaType,
		socketId: string,
		requestId?: string,
	) {
		// TODO database check
		const [error, result] = await withCatch(
			db.room.getUserInRoom(this.userId, data.payload.roomId),
		);
		if (error) {
			this.sendError({
				code: "ERR_SOMETHING_WENT_WRONG",
				requestId: data.meta?.requestId,
			});
			return;
		}

		if (!result) {
			this.sendError({
				code: "ERR_UNAUTHORIZED",
				message: "user dont have access to this room",
				requestId: data.meta?.requestId,
			});
			return;
		}

		this.addSocketToRoom(data.payload.roomId, socketId);
		requestId && this.aknowledge(requestId);
	}

	private sendError(payload: ErrorMessagePayloadSchemaType) {
		if (this.socket.readyState !== WebSocket.OPEN) return;
		this.socket.send(JSON.stringify(payload));
	}

	private aknowledge(requestId: string) {
		const payload: AknowlegementSchemaType = {
			type: "ACK",
			payload: {
				success: true,
				requestId,
			},
		};
		this.sendMessage(payload);
	}

	private sendMessage(payload: object) {
		if (this.socket.readyState !== WebSocket.OPEN) {
			return;
		}

		this.socket.send(JSON.stringify(payload));
	}
}
