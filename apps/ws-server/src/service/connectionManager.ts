import { withCatch } from "@canvio/util/withCatch";
import {
	type ErrorMessagePayloadSchemaType,
	type IncomingMessageSchemType,
	incomingMessageSchema,
} from "@canvio/util/ws";
import { WebSocket } from "ws";
import type { UserId } from "../types";
import { isValidRequestId } from "../utils";

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
			this.handleIncomingMessage(parsedData);
		});
	}

	private handleIncomingMessage(data: IncomingMessageSchemType) {
		switch (data.type) {
			case "ROOM.JOIN":
				break;
			case "ROOM.LEAVE":
				break;
		}
	}

	private sendError(payload: ErrorMessagePayloadSchemaType) {
		if (this.socket.readyState !== WebSocket.OPEN) return;
		this.socket.send(JSON.stringify(payload));
	}
}
