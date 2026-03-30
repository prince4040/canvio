import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const clientEnv = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_HTTP_API_URL: z.url(),
    NEXT_PUBLIC_WS_URL: z.url(),
    NEXT_PUBLIC_APP_NAME: z.string().default("My App"),
  },
  runtimeEnv: {
    NEXT_PUBLIC_HTTP_API_URL: process.env.NEXT_PUBLIC_HTTP_API_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  },
});
