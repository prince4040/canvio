import { withCatch } from "@canvio/util/withCatch";
import type { WebSocket } from "ws";
import type { UserId } from "../types";

export class ConnectionManger {
	private socket: WebSocket;
	private userId: UserId;

	constructor(socket: WebSocket, userId: UserId) {
		this.socket = socket;
		this.userId = userId;
		this.init();
	}

	public init() {
		this.socket.on("message", async (rawData) => {
			const [parseError, data] = await withCatch(
				JSON.parse(rawData.toString()),
			);

			if (parseError) {
				// TODO
				return;
			}
		});
	}
}
