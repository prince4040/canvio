import { withCatch } from "@canvio/util/withCatch";
import type { zod } from "@canvio/util/zod";
import { TRPCError } from "@trpc/server";
import type { contextInnerType } from "../../context";

export async function signupService(
	input: zod.signupType,
	ctx: contextInnerType,
) {
	const { email, name, password } = input;

	const [userError, userResult] = await withCatch(
		ctx.db.user.createUser(input),
	);

	if (userError) {
		throw new TRPCError({
			code: "CONFLICT",
			message: "user already exists",
		});
	}
}
