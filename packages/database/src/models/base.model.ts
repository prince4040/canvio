import type { ExtendedPrismaClient } from "../config/client";

export class Model {
	protected prisma: ExtendedPrismaClient;

	constructor(prisma: ExtendedPrismaClient) {
		this.prisma = prisma;
	}
}
