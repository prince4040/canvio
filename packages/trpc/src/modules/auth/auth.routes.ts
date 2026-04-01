import { publicProcedure, router } from "../../trpc";

export const authRouter = router({
	health: publicProcedure.query(() => {
		return { sucess: true };
	}),
});
