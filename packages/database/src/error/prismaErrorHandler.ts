import { Prisma } from "../../prisma/generated/prisma/client";
import { DBErrorClient } from "./dbErrorClient";
import { DBErrorServer } from "./dbErrorServer";

export function prismaErrorHandler(error: unknown): never {
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		switch (error.code) {
			case "P2002":
				throw new DBErrorClient({
					message: "duplicate entry",
					code: "UNIQUE_CONSTRAINT_VIOLATION",
					httpStatus: 409,
					prismaError: error,
				});
			case "P2003":
				throw new DBErrorClient({
					message: "foreign key constraint violation",
					code: "FOREIGN_KEY_CONSTRAINT_VIOLATION",
					httpStatus: 400,
					prismaError: error,
				});
			case "P2025":
				throw new DBErrorClient({
					message: "record not found",
					code: "NOT_FOUND",
					httpStatus: 404,
					prismaError: error,
				});
			case "P2000":
				throw new DBErrorClient({
					message: "value too long for column",
					code: "VALUE_TOO_LONG",
					httpStatus: 400,
					prismaError: error,
				});
			case "P2006":
				throw new DBErrorClient({
					message: "invalid value provided",
					code: "INVALID_VALUE",
					httpStatus: 400,
					prismaError: error,
				});
			case "P2011":
				throw new DBErrorClient({
					message: "null constraint violation",
					code: "NULL_CONSTRAINT_VIOLATION",
					httpStatus: 400,
					prismaError: error,
				});
			case "P2012":
				throw new DBErrorClient({
					message: "missing required value",
					code: "MISSING_REQUIRED_VALUE",
					httpStatus: 400,
					prismaError: error,
				});
			case "P2014":
				throw new DBErrorClient({
					message: "required relation violation",
					code: "RELATION_VIOLATION",
					httpStatus: 400,
					prismaError: error,
				});
			case "P2015":
				throw new DBErrorClient({
					message: "related record not found",
					code: "RELATED_RECORD_NOT_FOUND",
					httpStatus: 404,
					prismaError: error,
				});
			case "P2017":
				throw new DBErrorClient({
					message: "relation records not connected",
					code: "RELATION_NOT_CONNECTED",
					httpStatus: 400,
					prismaError: error,
				});
			case "P2019":
				throw new DBErrorClient({
					message: "input error",
					code: "INPUT_ERROR",
					httpStatus: 400,
					prismaError: error,
				});
			case "P2020":
				throw new DBErrorClient({
					message: "value out of range",
					code: "VALUE_OUT_OF_RANGE",
					httpStatus: 400,
					prismaError: error,
				});
			case "P2021":
				throw new DBErrorServer({
					message: "table does not exist",
					code: "TABLE_NOT_FOUND",
					httpStatus: 500,
					prismaError: error,
				});
			case "P2022":
				throw new DBErrorServer({
					message: "column does not exist",
					code: "COLUMN_NOT_FOUND",
					httpStatus: 500,
					prismaError: error,
				});
			case "P2024":
				throw new DBErrorServer({
					message: "connection pool timeout",
					code: "CONNECTION_POOL_TIMEOUT",
					httpStatus: 503,
					prismaError: error,
				});
			default:
				throw new DBErrorServer({
					message: "database request error",
					code: "DB_REQUEST_ERROR",
					httpStatus: 500,
					prismaError: error,
				});
		}
	}

	if (error instanceof Prisma.PrismaClientValidationError) {
		throw new DBErrorServer({
			message: "invalid query",
			code: "VALIDATION_ERROR",
			httpStatus: 500,
			prismaError: error,
		});
	}

	if (error instanceof Prisma.PrismaClientInitializationError) {
		throw new DBErrorServer({
			message: "database connection failed",
			code: "DB_CONNECTION_ERROR",
			httpStatus: 503,
			prismaError: error,
		});
	}

	if (error instanceof Prisma.PrismaClientRustPanicError) {
		throw new DBErrorServer({
			message: "prisma engine crashed",
			code: "PRISMA_ENGINE_CRASH",
			httpStatus: 500,
			prismaError: error,
		});
	}

	if (error instanceof Prisma.PrismaClientUnknownRequestError) {
		throw new DBErrorServer({
			message: "unknown database error",
			code: "UNKNOWN_DB_ERROR",
			httpStatus: 500,
			prismaError: error,
		});
	}

	throw error;
}
