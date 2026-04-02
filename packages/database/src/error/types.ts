import type { Prisma } from "../../prisma/generated/prisma/client";

export type PrismaError =
	| Prisma.PrismaClientKnownRequestError
	| Prisma.PrismaClientUnknownRequestError
	| Prisma.PrismaClientValidationError
	| Prisma.PrismaClientInitializationError
	| Prisma.PrismaClientRustPanicError;

export type DbErrorArgument = {
	message: string;
	code: DBErrorCode;
	httpStatus: number;
	prismaError: PrismaError;
};

export type DBErrorCode =
	| "UNIQUE_CONSTRAINT_VIOLATION"
	| "FOREIGN_KEY_CONSTRAINT_VIOLATION"
	| "NOT_FOUND"
	| "VALUE_TOO_LONG"
	| "INVALID_VALUE"
	| "NULL_CONSTRAINT_VIOLATION"
	| "MISSING_REQUIRED_VALUE"
	| "RELATION_VIOLATION"
	| "RELATED_RECORD_NOT_FOUND"
	| "RELATION_NOT_CONNECTED"
	| "INPUT_ERROR"
	| "VALUE_OUT_OF_RANGE"
	| "TABLE_NOT_FOUND"
	| "COLUMN_NOT_FOUND"
	| "CONNECTION_POOL_TIMEOUT"
	| "DB_REQUEST_ERROR"
	| "VALIDATION_ERROR"
	| "DB_CONNECTION_ERROR"
	| "PRISMA_ENGINE_CRASH"
	| "UNKNOWN_DB_ERROR";
