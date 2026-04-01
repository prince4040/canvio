import type { createPrisma } from "@canvio/database";

type createContextInnerOpts = {
	db: createPrisma;
	user: {
		id: string;
		role: "admin" | "viewer" | "writer";
	} | null;
	setCookie?: (key: string, value: string) => void;
};

export async function createContextInner({
	db,
	user,
	setCookie = () => {},
}: createContextInnerOpts) {
	return {
		db,
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

export type contextInnerType = Awaited<ReturnType<typeof createContextInner>>;
