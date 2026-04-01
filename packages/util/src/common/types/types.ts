export type UserRole = "admin" | "viewer" | "writer";

export type JwtPayload = {
	userId: string;
};
