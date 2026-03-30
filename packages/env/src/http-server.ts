import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const httpEnv = createEnv({
  server: {
    HTTP_PORT: z.coerce.number().default(3001),
  },
  runtimeEnv: process.env,
});
