import type { PrismaClient } from "../../prisma/generated/prisma/client";

export class Model {
	protected prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}
}
