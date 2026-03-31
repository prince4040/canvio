import { createContextInner } from "@canvio/trpc/context";
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { prisma } from "./prisma";

export function createContext(opts: CreateHTTPContextOptions) {
	return createContextInner({ prisma });
}
