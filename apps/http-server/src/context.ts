import { createContextInner } from "@canvio/trpc/context";
import { TRPCError } from "@trpc/server";
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { parse } from "cookie";
import { prisma } from "./prisma";
import { JwtService, withCatch } from "./utils";

export async function createContext(opts: CreateHTTPContextOptions) {
	const parsedCookies = parse(String(opts.req.headers.cookie));
	const token = parsedCookies.token;

	if (!token) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "token not found",
		});
	}

	const [jwtError, jwtResult] = await withCatch(JwtService.verify(token));
	if (jwtError) {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "user is not authorised",
		});
	}

	const userId = jwtResult.payload.userId;
	const role = jwtResult.payload.role;

	return createContextInner({
		prisma,
		user: {
			id: userId,
			role,
		},
	});
}
