import { createContextInner } from "@canvio/trpc/context";
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { parse } from "cookie";
import { prisma } from "./prisma";

export function createContext(opts: CreateHTTPContextOptions) {
	const parsedCookies = parse(String(opts.req.headers.cookie));
	console.log(parsedCookies);
	return createContextInner({ prisma });
}
