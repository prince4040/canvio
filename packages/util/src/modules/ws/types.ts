import type { z } from "zod";
import type {
	aknowlegementSchema,
	baseMeta,
	errorCodes,
	errorMessagePayloadSchema,
	errorMessageSchema,
	incomingMessageSchema,
	joinRoonSchema,
	leaveRoomSchema,
} from "./schema";

export type BaseMeta = z.infer<typeof baseMeta>;

export type JoinRoonSchemaType = z.infer<typeof joinRoonSchema>;

export type LeaveRoomSchemaType = z.infer<typeof leaveRoomSchema>;

export type IncomingMessageSchemType = z.infer<typeof incomingMessageSchema>;

export type ErrorCodesType = z.infer<typeof errorCodes>;

export type ErrorMessageSchemaType = z.infer<typeof errorMessageSchema>;

export type AknowlegementSchemaType = z.infer<typeof aknowlegementSchema>;

export type ErrorMessagePayloadSchemaType = z.infer<
	typeof errorMessagePayloadSchema
>;
