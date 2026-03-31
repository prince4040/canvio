import { createContextInner } from "@canvio/trpc/context";
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { parse } from "cookie";
import { prisma } from "./prisma";
import { JwtService, withCatch } from "./utils";

export async function createContext(opts: CreateHTTPContextOptions) {
	const parsedCookies = parse(String(opts.req.headers.cookie));
	const token = parsedCookies.token;

	let userId = null;
	let role = null;

	if (token) {
		const [_, jwtResult] = await withCatch(JwtService.verify(token));

		userId = jwtResult?.payload.userId;
		role = jwtResult?.payload.role;
	}

	return createContextInner({
		prisma,
		...(userId && role
			? {
					user: {
						id: userId,
						role,
					},
				}
			: {
					user: null,
				}),
	});
}
