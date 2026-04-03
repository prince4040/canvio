import z from "zod";
import { UserRole } from "../auth";

export const createRoomSchema = z.object({
	name: z.string(),
});

export const addMemberSchema = z.object({
	role: UserRole,
	roomId: z.string(),
});
