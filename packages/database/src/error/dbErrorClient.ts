import { DBError } from "./dbError";
import type { DbErrorArgument } from "./types";

export class DBErrorClient extends DBError {
	readonly kind = "client" as const;
	readonly type = "client" as const;

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
