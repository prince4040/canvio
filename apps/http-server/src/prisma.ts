import { createPrisma } from "@canvio/database";
import { serverEnv } from "@canvio/env/server";

const prismaObject = new createPrisma(serverEnv.DATABASE_URL);

export const prisma = prismaObject.getPrisma();
export const db = prismaObject;
