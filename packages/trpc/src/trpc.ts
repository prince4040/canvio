import { initTRPC, TRPCError } from "@trpc/server";
import type { ContextInnerType } from "./context";
import { buildErrorFormatter } from "./errorFormatter";

export function isJSONparsable(input: string) {
	try {
		return JSON.parse(input);
	} catch {
		return false;
	}
}

const t = initTRPC.context<ContextInnerType>().create({
	isDev: process.env.NODE_ENV !== "production",
	errorFormatter: buildErrorFormatter,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const authedProcedure = publicProcedure.use(async ({ ctx, next }) => {
	if (!ctx.user) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "user is not authorized",
		});
	}

	return next({
		ctx: {
			user: ctx.user,
		},
	});
});
