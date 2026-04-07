import { serverEnv } from "@canvio/env/server";
import type { JwtPayload } from "@canvio/util/auth";
import { JwtUtil } from "@canvio/util/jwt";

export { withCatch } from "@canvio/util/withCatch";

export const JwtService = new JwtUtil<JwtPayload>({
	secret: serverEnv.JWT_SECRET,
	issuer: "canvio",
	expirationTime: "2d",
});

export * from "./predicate";
