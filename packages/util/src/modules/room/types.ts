import type { z } from "zod";
import type {
	addMemberSchema,
	createRoomSchema,
	removeMemberSchema,
} from "./schema";

export type CreateRoomSchemaType = z.infer<typeof createRoomSchema>;
export type addMemberSchemaType = z.infer<typeof addMemberSchema>;
export type removeMenmberSchemaType = z.infer<typeof removeMemberSchema>;
