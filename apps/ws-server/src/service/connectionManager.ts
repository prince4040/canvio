import type { WebSocket } from "ws";
import type { UserId } from "../types";

export class ConnectionManger {
	private socket: WebSocket;
	private userId: UserId;

	constructor(socket: WebSocket, userId: UserId) {
		this.socket = socket;
		this.userId = userId;
	}

	public init() {
		this.socket.on("message", () => {});
	}
}
