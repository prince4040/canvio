import { DBError } from "./dbError";
import type { DbErrorArgument } from "./types";

export class DBErrorServer extends DBError {
	constructor({
		message,
		prismaError,
		code,
		httpStatus,
	}: Omit<DbErrorArgument, "type">) {
		super({
			message,
			type: "server",
			code,
			httpStatus,
			prismaError,
		});
	}
}
