import { signinSchema, signupSchema } from "@canvio/util/auth";
import { publicProcedure, router } from "../../trpc";
import { signinService, signupService } from "./auth.service";

export const authRouter = router({
	signup: publicProcedure
		.input(signupSchema)
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

	signin: publicProcedure
		.input(signinSchema)
		.mutation(async ({ input, ctx }) => {
			const result = await signinService(input, ctx);

			ctx.setCookie("token", result.token);

			return {
				success: true,
				data: {
					user: result.user,
				},
			};
		}),
});
