import type { UserRoleType } from "@canvio/util/auth";
import { withCatch } from "@canvio/util/withCatch";
import {
	type AknowlegementSchemaType,
	type ErrorMessagePayloadSchemaType,
	type IncomingMessageSchemType,
	incomingMessageSchema,
	type JoinRoonSchemaType,
	type LeaveRoomSchemaType,
} from "@canvio/util/ws";
import { WebSocket } from "ws";
import { db } from "../db";
import { roomSockets, sockets, userSockets } from "./../store/data";
import type { SocketId, UserConnection, UserId } from "../types";
import { isValidRequestId } from "../utils";

export class ConnectionManger {
	private socket: WebSocket;
	private userId: UserId;
	private socketId?: SocketId;

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
			rooms: new Map(),
			isAlive: true,
			createAt: new Date(),
		};
		sockets.set(socketId, connection);

		if (!userSockets.has(this.userId)) {
			userSockets.set(this.userId, new Set());
		}

		userSockets.get(this.userId)?.add(socketId);
		this.socketId = socketId;

		return socketId;
	}

	public init() {
		// handle connection
		const socketId = this.addConnection();

		this.socket.on("message", async (rawData) => {
			let data: unknown;
			let requestId: string | undefined;
			try {
				data = JSON.parse(rawData.toString());
			} catch {
				if (isValidRequestId(data)) {
					requestId = data.meta.requestId;
				}
				this.sendError({
					code: "ERR_INVALID_FORMAT",
					message: "invalid json format",
					requestId,
				});
				return;
			}

			if (isValidRequestId(data)) {
				requestId = data.meta.requestId;
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

		this.socket.on("close", async () => {
			this.handleDisconnect();
		});
	}

	private handleDisconnect() {
		this.cleanupConnection();
	}

	private cleanupConnection() {
		const socketId = this.socketId;
		if (!socketId) return;

		const connection = sockets.get(socketId);
		if (!connection) return;

		for (const [roomId] of connection.rooms) {
			this.removeSocketFromRoom(socketId, roomId);
		}

		sockets.delete(socketId);

		const userSet = userSockets.get(connection.userId);
		if (userSet) {
			userSet?.delete(socketId);
			if (userSet?.size === 0) userSockets.delete(this.userId);
		}
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
				this.handleLeaveRoom(data, socketId, requestId);
				break;
		}
	}

	private handleLeaveRoom(
		data: LeaveRoomSchemaType,
		socketId: string,
		requestId?: string,
	) {
		this.removeSocketFromRoom(data.payload.roomId, socketId);
		requestId && this.aknowledge(requestId);
	}

	private removeSocketFromRoom(roomId: string, socketId: string) {
		sockets.get(socketId)?.rooms.delete(roomId);

		const roomMembers = roomSockets.get(roomId);
		if (roomMembers) {
			roomMembers.delete(socketId);
			if (roomMembers.size === 0) roomSockets.delete(roomId);
		}
	}

	private addSocketToRoom(
		roomId: string,
		socketId: string,
		role: UserRoleType,
	) {
		if (!roomSockets.has(roomId)) {
			roomSockets.set(roomId, new Set());
		}

		roomSockets.get(roomId)?.add(socketId);

		sockets.get(socketId)?.rooms.set(roomId, role);
	}

	private async handleJoinRoom(
		data: JoinRoonSchemaType,
		socketId: string,
		requestId?: string,
	) {
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

		const role = result.role;

		this.addSocketToRoom(data.payload.roomId, socketId, role);
		if (requestId) this.aknowledge(requestId);
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
