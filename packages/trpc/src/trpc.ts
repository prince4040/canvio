import { initTRPC, TRPCError } from "@trpc/server";
import type { createContextInner } from "./context";

const t = initTRPC.context<createContextInner>().create();

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
