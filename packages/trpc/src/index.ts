import z from "zod";
import { publicProcedure, router } from "./config/trpc";
import { authRouter } from "./modules/auth/auth.routes";
import { roomRouter } from "./modules/room/room.routes";

export const appRouter = router({
	test: publicProcedure
		.input(
			z.object({
				msg: z.string(),
			}),
		)
		.query(async () => {
			return {
				success: true,
				msg: "fatched sucessfully",
			};
		}),
	auth: authRouter,
	room: roomRouter,
});

export type AppRouter = typeof appRouter;
