import { zod } from "@canvio/util/zod";
import { publicProcedure, router } from "../../trpc";
import { signupService } from "./auth.service";

export const authRouter = router({
	signup: publicProcedure
		.input(zod.signupSchema)
		.mutation(async ({ input, ctx }) => {
			const result = await signupService(input, ctx);

			ctx.setCookie("token", result.token);

			return {
				sucess: true,
				message: "user created sucessfully",
				data: {
					user: result.user,
				},
			};
		}),
});
