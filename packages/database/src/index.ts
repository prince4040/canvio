import { PrismaPg } from "@prisma/adapter-pg";
import type { PrismaClient } from "../prisma/generated/prisma/client";
import { type ExtendedPrismaClient, initPrismaClient } from "./config/client";
import type { DBErrorCode } from "./error/types";
import { UserModel } from "./models/user.model";

declare global {
	var prisma: ExtendedPrismaClient | undefined;
}

export class PrismaService {
	private readonly prisma: ExtendedPrismaClient;
	public readonly user: UserModel;

	constructor(connectionString: string) {
		if (!globalThis.prisma) {
			const adapter = new PrismaPg({ connectionString });
			const prisma = initPrismaClient(adapter);

			globalThis.prisma = prisma;
		}
		this.prisma = globalThis.prisma;
		this.user = new UserModel(this.prisma);
	}

	getPrisma() {
		return this.prisma;
	}
}

export { DBError } from "./error/dbError";
export { DBErrorClient } from "./error/dbErrorClient";
export { DBErrorServer } from "./error/dbErrorServer";
export { prismaErrorHandler } from "./error/prismaErrorHandler";
export type { DBErrorCode, ExtendedPrismaClient, PrismaClient };
