import { z } from "zod";

export const baseMeta = z.object({
	requestId: z.string().optional(),
});

export const joinRoonSchema = z.object({
	type: z.literal("ROOM.JOIN"),
	payload: z.object({
		roomId: z.string(),
	}),
	meta: baseMeta.optional(),
});

export const leaveRoomSchema = z.object({
	type: z.literal("ROOM.LEAVE"),
	payload: z.object({
		roomId: z.string(),
	}),
	meta: baseMeta.optional(),
});

export const incomingMessageSchema = z.discriminatedUnion("type", [
	joinRoonSchema,
	leaveRoomSchema,
]);

export const errorCodes = z
	.literal("ERR_UNAUTHORIZED")
	.or(z.literal("ERR_VERSION_STALE"))
	.or(z.literal("ERR_PAYLOAD_TOO_LARGE"))
	.or(z.literal("ERR_ROOM_FULL"))
	.or(z.literal("ERR_INVALID_FORMAT"))
	.or(z.literal("ERR_SOMETHING_WENT_WRONG"));

export const errorMessagePayloadSchema = z.object({
	requestId: z.string().optional(),
	code: errorCodes,
	message: z.string().optional(),
	currentVersion: z.number().positive().optional(),
});
export const errorMessageSchema = z.object({
	type: z.literal("ERROR"),
	payload: errorMessagePayloadSchema,
});

export const aknowlegementSchema = z.object({
	type: z.literal("ACK"),
	payload: z.object({
		success: true,
		requestId: z.string(),
	}),
});
