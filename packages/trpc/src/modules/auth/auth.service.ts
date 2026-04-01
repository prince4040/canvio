import type { signupSchemaType } from "@canvio/util/auth";
import { withCatch } from "@canvio/util/withCatch";
import { TRPCError } from "@trpc/server";
import type { ContextInnerType } from "../../context";

export async function signupService(
	input: signupSchemaType,
	ctx: ContextInnerType,
) {
	const [userError, userResult] = await withCatch(
		ctx.db.user.createUser(input),
	);

	if (userError) {
		throw new TRPCError({
			code: "CONFLICT",
			message: "user already exists",
		});
	}

	const token = await ctx.signJwt({
		userId: userResult.id,
	});

	const { password, ...safeUser } = userResult;

	return {
		user: safeUser,
		token,
	};
}
