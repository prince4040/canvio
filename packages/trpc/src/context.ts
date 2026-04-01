import type { PrismaClient } from "@canvio/database";

type createContextInnerOpts = {
	prisma: PrismaClient;
	user: {
		id: string;
		role: "admin" | "viewer" | "writer";
	} | null;
	setCookie?: (key: string, value: string) => void;
};

export async function createContextInner({
	prisma,
	user,
	setCookie = () => {},
}: createContextInnerOpts) {
	return {
		prisma: prisma,
		setCookie,
		...(user
			? {
					user: {
						id: user.id,
						role: user.role,
					},
				}
			: {
					user: null,
				}),
	};
}

export type createContextInner = Awaited<ReturnType<typeof createContextInner>>;
