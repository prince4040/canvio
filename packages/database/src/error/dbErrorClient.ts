import { DBError } from "./dbError";
import type { DbErrorArgument } from "./types";

export class DBErrorClient extends DBError {
	constructor({
		message,
		prismaError,
		code,
		httpStatus,
	}: Omit<DbErrorArgument, "type">) {
		super({
			message,
			type: "client",
			code,
			httpStatus,
			prismaError,
		});
	}
}
