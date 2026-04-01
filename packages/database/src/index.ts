import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/prisma/client";
import { UserModel } from "./models/user.model";

declare global {
	var prisma: PrismaClient | undefined;
}

export class createPrisma {
	private prisma: PrismaClient;
	public user: UserModel;

	constructor(connectionString: string) {
		if (!globalThis.prisma) {
			const adapter = new PrismaPg({ connectionString });
			const prisma = new PrismaClient({ adapter });
			globalThis.prisma = prisma;
		}
		this.prisma = globalThis.prisma;
		this.user = new UserModel(this.prisma);
	}

	getPrisma() {
		return this.prisma;
	}
}

export type { PrismaClient };
