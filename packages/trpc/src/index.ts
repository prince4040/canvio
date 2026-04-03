import { router } from "./config/trpc";
import { authRouter } from "./modules/auth/auth.routes";

export const appRouter = router({
	auth: authRouter,
});

export type Approuter = typeof appRouter;
