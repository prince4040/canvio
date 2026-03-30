import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),

    DATABASE_URL: z.url(),
    JWT_SECRET: z.string().min(8),
  },
  runtimeEnv: process.env,
});
