import { PrismaService } from "@canvio/database";
import { serverEnv } from "@canvio/env/server";

const prismaService = new PrismaService(serverEnv.DATABASE_URL);

export const prisma = prismaService.getPrisma();
export const db = prismaService;
