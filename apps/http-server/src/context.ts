import { serverEnv } from "@canvio/env/server";
import { createContextInner } from "@canvio/trpc/context";
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { parse, serialize } from "cookie";
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

	const setCookie = (key: string, value: string) => {
		const cookie = serialize(key, value, {
			httpOnly: true,
			secure: serverEnv.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
		});
		opts.res.setHeader("Set-Cookie", cookie);
	};

	return createContextInner({
		prisma,
		setCookie,
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
