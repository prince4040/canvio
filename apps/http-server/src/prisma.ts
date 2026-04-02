import { type ExtendedPrismaClient, PrismaService } from "@canvio/database";
import { serverEnv } from "@canvio/env/server";

const prismaService = new PrismaService(serverEnv.DATABASE_URL);

export const prisma: ExtendedPrismaClient = prismaService.getPrisma();
export const db = prismaService;
