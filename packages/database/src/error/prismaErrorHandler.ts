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
