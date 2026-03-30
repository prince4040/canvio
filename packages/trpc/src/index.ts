import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  health: publicProcedure.query(() => {
    return "healthy";
  }),
});

export type Approuter = typeof appRouter;
