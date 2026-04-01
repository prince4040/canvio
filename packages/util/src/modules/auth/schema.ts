import z from "zod";

export const signupSchema = z.object({
	email: z.email(),
	password: z.string().min(6).max(30),
	name: z.string().optional(),
});
