import type { z } from "zod";
import type { signinSchema, signupSchema } from "./schema";

export type UserRole = "admin" | "viewer" | "writer";

export type JwtPayload = {
	userId: string;
};

export type SignupSchemaType = z.infer<typeof signupSchema>;
export type SigninSchemaType = z.infer<typeof signinSchema>;
