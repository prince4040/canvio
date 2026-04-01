import { authRouter } from "./modules/auth/auth.routes";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
	health: publicProcedure.query(() => {
		return "healthy";
	}),
	auth: authRouter,
});

export type Approuter = typeof appRouter;
