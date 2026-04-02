import { DBError } from "./dbError";
import type { DbErrorArgument } from "./types";

export class DBErrorServer extends DBError {
	readonly kind = "server" as const;
	readonly type = "server" as const;

	constructor({
		message,
		prismaError,
		code,
		httpStatus,
	}: Omit<DbErrorArgument, "type">) {
		super({
			message,
			code,
			httpStatus,
			prismaError,
		});
	}
}
