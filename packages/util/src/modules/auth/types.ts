import type { z } from "zod";
import type { signinSchema, signupSchema, UserRole } from "./schema";

export type UserRoleType = z.infer<typeof UserRole>;

export type JwtPayload = {
	userId: string;
};

export type SignupSchemaType = z.infer<typeof signupSchema>;
export type SigninSchemaType = z.infer<typeof signinSchema>;
