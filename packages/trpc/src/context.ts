import type { PrismaClient } from "@canvio/database";

type createContextInnerOpts = {
	prisma: PrismaClient;
	user: {
		id: string;
		role: "admin" | "viewer" | "writer";
	};
};

export async function createContextInner(opts: createContextInnerOpts) {
	return {
		prisma: opts.prisma,
		user: {
			id: opts.user.id,
			role: opts.user.role,
		},
	};
}

export type createContextInner = Awaited<ReturnType<typeof createContextInner>>;
