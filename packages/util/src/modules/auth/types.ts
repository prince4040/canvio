import type { z } from "zod";
import type { signupSchema } from "./schema";

export type SignupSchemaType = z.infer<typeof signupSchema>;

export type UserRole = "admin" | "viewer" | "writer";

export type JwtPayload = {
	userId: string;
};
