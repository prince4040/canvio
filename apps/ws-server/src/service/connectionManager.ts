import { withCatch } from "@canvio/util/withCatch";
import {
	type ErrorMessagePayloadSchemaType,
	type IncomingMessageSchemType,
	incomingMessageSchema,
	type JoinRoonSchemaType,
} from "@canvio/util/ws";
import { WebSocket } from "ws";
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
			this.handleIncomingMessage(parsedData, socketId);
		});
	}

	private handleIncomingMessage(
		data: IncomingMessageSchemType,
		socketId: string,
	) {
		switch (data.type) {
			case "ROOM.JOIN":
				this.handleJoinRoom(data, socketId);
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

	private handleJoinRoom(data: JoinRoonSchemaType, socketId: string) {
		// TODO database check
		this.addSocketToRoom(data.payload.roomId, socketId);
	}

	private sendError(payload: ErrorMessagePayloadSchemaType) {
		if (this.socket.readyState !== WebSocket.OPEN) return;
		this.socket.send(JSON.stringify(payload));
	}
}
