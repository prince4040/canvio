import { PrismaService } from "@canvio/database";
import { serverEnv } from "@canvio/env/server";

export const db = new PrismaService(serverEnv.DATABASE_URL);
