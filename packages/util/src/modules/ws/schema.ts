import { z } from "zod";

export const baseMeta = z.object({
	requestId: z.string(),
});

export const joinRoonSchema = z.object({
	type: z.literal("ROOM.JOIN"),
	paylaod: z.object({
		roomId: z.string(),
	}),
});

export const leaveRoomSchema = z.object({
	type: z.literal("ROOM.LEAVE"),
	paylaod: z.object({
		roomId: z.string(),
	}),
});

export const incomingMessageSchema = z.discriminatedUnion("type", [
	joinRoonSchema,
	leaveRoomSchema,
]);
