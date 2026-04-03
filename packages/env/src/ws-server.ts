import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const wsEnv = createEnv({
	server: {
		WS_PORT: z.coerce.number(),
	},
	runtimeEnv: process.env,
});
