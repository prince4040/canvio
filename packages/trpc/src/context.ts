import type { PrismaClient } from "@canvio/database";

type createContextInnerOpts = {
	prisma: PrismaClient;
	user: {
		id: string;
		role: "admin" | "viewer" | "writer";
	} | null;
};

export async function createContextInner(opts: createContextInnerOpts) {
	return {
		prisma: opts.prisma,
		...(opts.user
			? {
					user: {
						id: opts.user.id,
						role: opts.user.role,
					},
				}
			: {
					user: null,
				}),
	};
}

export type createContextInner = Awaited<ReturnType<typeof createContextInner>>;
