import { serverEnv } from "@canvio/env/server";
import { JwtUtil } from "@canvio/util/jwt";

export { withCatch } from "@canvio/util/withCatch";

type UserRole = "admin" | "viewer" | "writer";

export const JwtService = new JwtUtil<{
	userId: string;
	role: UserRole;
}>({
	secret: serverEnv.JWT_SECRET,
	issuer: "canvio",
	expirationTime: "2d",
});
