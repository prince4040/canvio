import type { DbErrorArgument, PrismaError } from "./types";

export class DBError extends Error {
	public rawMessage: string;
	public prismaError: PrismaError;
	public code: string;
	public prismaCode: string | undefined;
	public httpStatus: number;
	public type: "server" | "client";

	constructor({
		message,
		type,
		prismaError,
		code,
		httpStatus,
	}: DbErrorArgument) {
		super(message);
		this.rawMessage = prismaError.message;
		this.prismaCode = (prismaError as { code?: string }).code;
		this.type = type;
		this.code = code;
		this.httpStatus = httpStatus;
		this.prismaError = prismaError;
	}
}
