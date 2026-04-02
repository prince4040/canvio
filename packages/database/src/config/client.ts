import type { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma/generated/prisma/client";
import { prismaErrorHandler } from "../error/prismaErrorHandler";

export function initPrismaClient(adapter: PrismaPg) {
	const prisma = new PrismaClient({
		adapter,
		errorFormat: "minimal",
	}).$extends({
		name: "errorInterceptor",
		query: {
			$allModels: {
				async $allOperations({ args, query }) {
					try {
						return await query(args);
					} catch (e) {
						prismaErrorHandler(e);
					}
				},
			},
		},
	});

	return prisma;
}

export type ExtendedPrismaClient = ReturnType<typeof initPrismaClient>;
