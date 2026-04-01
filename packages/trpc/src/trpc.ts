import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";
import type { contextInnerType } from "./context";

export function isJSONparsable(input: string) {
	try {
		return JSON.parse(input);
	} catch {
		return false;
	}
}

const t = initTRPC.context<contextInnerType>().create({
	errorFormatter: (opts) => {
		const { shape, error } = opts;

		const parsedMessage = isJSONparsable(shape.message);
		return {
			...shape,
			...(parsedMessage
				? {
						detailed: parsedMessage,
					}
				: {}),
			message:
				parsedMessage && typeof parsedMessage === "object"
					? parsedMessage[0]?.message
					: shape.message,
			data: {
				zodError:
					error.code === "BAD_REQUEST" &&
					error.cause instanceof ZodError
						? error?.cause?.flatten()
						: null,
			},
		};
	},
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
