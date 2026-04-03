import type { DBErrorCode } from "@canvio/database";
import { DBErrorClient, DBErrorServer } from "@canvio/database";
import type { TRPCDefaultErrorShape } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { flattenError, ZodError } from "zod";

type ErrorType =
	| "VALIDATION"
	| "DB_CLIENT"
	| "DB_SERVER"
	| "AUTH"
	| "TRPC"
	| "UNKNOWN";

type ZodIssueFormatted = {
	path: (string | number)[];
	message: string;
	code: string | undefined;
};

type FormattedErrorData = TRPCDefaultErrorShape["data"] & {
	errorType: ErrorType;
	// VALIDATION
	fieldErrors?: Record<string, string[] | undefined>;
	formErrors?: string[];
	issues?: ZodIssueFormatted[];
	// DB_CLIENT / DB_SERVER
	dbCode?: DBErrorCode;
	// dev-only
	prismaCode?: string;
	rawMessage?: string;
};

type FormattedErrorShape = {
	message: string;
	code: number;
	data: FormattedErrorData;
};

type ErrorFormatterOpts = {
	shape: TRPCDefaultErrorShape;
	error: TRPCError;
	path: string | undefined;
	// biome-ignore lint/suspicious/noExplicitAny: tRPC internal type
	input: any;
	type: "query" | "mutation" | "subscription" | "unknown";
};

const isDev = process.env.NODE_ENV !== "production";

export function buildErrorFormatter(
	opts: ErrorFormatterOpts,
): FormattedErrorShape {
	const { shape, error } = opts;
	const cause = error.cause;

	let errorType: ErrorType;
	let message: string;
	let extra: Partial<FormattedErrorData> = {};

	if (cause instanceof ZodError) {
		errorType = "VALIDATION";
		// Zod v4 sets message to JSON.stringify(issues) — replace with a clean UI string
		message =
			cause.issues.length === 1
				? (cause.issues[0]?.message ?? "Validation failed")
				: "Validation failed";

		const { fieldErrors, formErrors } = flattenError(cause);
		const issues: ZodIssueFormatted[] = cause.issues.map((issue) => ({
			path: issue.path.map((p) =>
				typeof p === "symbol" ? String(p) : p,
			),
			message: issue.message,
			code: issue.code,
		}));

		extra = { fieldErrors, formErrors, issues };
	} else if (cause instanceof DBErrorClient) {
		errorType = "DB_CLIENT";
		// cause.message is already a clean developer-written string (e.g. "duplicate entry")
		message = cause.message;
		extra = {
			dbCode: cause.code,
			...(isDev && {
				prismaCode: cause.prismaCode,
				rawMessage: cause.rawMessage,
			}),
		};
	} else if (cause instanceof DBErrorServer) {
		errorType = "DB_SERVER";
		// Never expose internal server error details to the UI
		message = "Something went wrong. Please try again.";
		extra = {
			dbCode: cause.code,
			...(isDev && {
				prismaCode: cause.prismaCode,
				rawMessage: cause.rawMessage,
			}),
		};
	} else if (error.code === "UNAUTHORIZED") {
		errorType = "AUTH";
		message = error.message;
	} else if (error instanceof TRPCError) {
		errorType = "TRPC";
		// Developer-set message on TRPCError is always UI-safe
		message = error.message;
	} else {
		errorType = "UNKNOWN";
		message = "An unexpected error occurred.";
	}

	return {
		...shape,
		message,
		data: {
			...shape.data,
			errorType,
			...extra,
			...(isDev && { stack: error.stack }),
		},
	};
}
