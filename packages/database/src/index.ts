import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/prisma/client";

declare global {
	var prisma: PrismaClient | undefined;
}

export class createPrisma {
	private prisma: PrismaClient;

	constructor(connectionString: string) {
		if (!globalThis.prisma) {
			const adapter = new PrismaPg({ connectionString });
			const prisma = new PrismaClient({ adapter });
			globalThis.prisma = prisma;
		}
		this.prisma = globalThis.prisma;
	}

	getPrisma() {
		return this.prisma;
	}
}

export type { PrismaClient };
