import type { Prisma } from "../../prisma/generated/prisma/client";

export type PrismaError =
	| Prisma.PrismaClientKnownRequestError
	| Prisma.PrismaClientUnknownRequestError
	| Prisma.PrismaClientValidationError
	| Prisma.PrismaClientInitializationError
	| Prisma.PrismaClientRustPanicError;

export type DbErrorArgument = {
	message: string;
	type: "server" | "client";
	code: string;
	httpStatus: number;
	prismaError: PrismaError;
};
