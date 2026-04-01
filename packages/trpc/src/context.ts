import type { PrismaService } from "@canvio/database";
import type { JwtPayload, UserRole } from "@canvio/util/common/types";

type CreateContextInnerOpts = {
	db: PrismaService;
	user: {
		id: string;
		role: UserRole;
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

export type contextInnerType = ReturnType<typeof createContextInner>;
