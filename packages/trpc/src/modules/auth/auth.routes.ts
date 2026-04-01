import { zod } from "@canvio/util/zod";
import { publicProcedure, router } from "../../trpc";

export const authRouter = router({
	signup: publicProcedure
		.input(zod.signupSchema)
		.mutation(async ({ input, ctx }) => {}),
});
