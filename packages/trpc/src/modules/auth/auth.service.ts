import { DBErrorClient } from "@canvio/database";
import type { SigninSchemaType, SignupSchemaType } from "@canvio/util/auth";
import { withCatch } from "@canvio/util/withCatch";
import { TRPCError } from "@trpc/server";
import type { ContextInnerType } from "../../context";

export async function signupService(
	input: SignupSchemaType,
	ctx: ContextInnerType,
) {
	const [userError, userResult] = await withCatch(
		ctx.db.user.createUser(input),
		[DBErrorClient],
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

export async function signinService(
	input: SigninSchemaType,
	ctx: ContextInnerType,
) {
	const userResult = await ctx.db.user.getUserByEmail(input.email);

	if (!userResult) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "user doesn't exists",
		});
	}

	if (userResult?.password !== input.password) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "invalid password",
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
