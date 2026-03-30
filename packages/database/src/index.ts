import { PrismaClient } from "../prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

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
}
