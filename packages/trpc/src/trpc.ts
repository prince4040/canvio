import { initTRPC } from "@trpc/server";
import type { createContextInner } from "./context";

const t = initTRPC.context<createContextInner>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
