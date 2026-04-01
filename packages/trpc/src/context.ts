import type { PrismaService } from "@canvio/database";

type CreateContextInnerOpts = {
	db: PrismaService;
	user: {
		id: string;
		role: "admin" | "viewer" | "writer";
	} | null;
	setCookie?: (key: string, value: string) => void;
};

export function createContextInner({
	db,
	user,
	setCookie = () => {},
}: CreateContextInnerOpts) {
	return { db, setCookie, user };
}

export type contextInnerType = ReturnType<typeof createContextInner>;
