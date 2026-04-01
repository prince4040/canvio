import type { zod } from "@canvio/util/zod";
import type { contextInnerType } from "../../context";

export function signupService(input: zod.signupType, ctx: contextInnerType) {
	const { email, name, password } = input;
}
