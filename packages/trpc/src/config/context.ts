import type { PrismaService } from "@canvio/database";
import type { JwtPayload } from "@canvio/util/auth";

type CreateContextInnerOpts = {
	db: PrismaService;
	user: {
		id: string;
	} | null;
	setCookie?: (key: string, value: string) => void;
	signJwt: (payload: JwtPayload) => Promise<string>;
};

export function createContextInner({
	db,
	user,
	setCookie = () => {},
	signJwt,
}: CreateContextInnerOpts) {
	return { db, setCookie, user, signJwt };
}

export type ContextInnerType = ReturnType<typeof createContextInner>;
