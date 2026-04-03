import type { z } from "zod";
import type { addMemberSchema, createRoomSchema } from "./schema";

export type CreateRoomSchemaType = z.infer<typeof createRoomSchema>;
export type addMemberSchemaType = z.infer<typeof addMemberSchema>;
