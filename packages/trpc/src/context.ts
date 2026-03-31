import type { PrismaClient } from "@canvio/database";

type createContextInnerOpts = {
	prisma: PrismaClient;
};

export async function createContextInner(opts: createContextInnerOpts) {
	return {
		prisma: opts.prisma,
	};
}

export type createContextInner = Awaited<ReturnType<typeof createContextInner>>;
