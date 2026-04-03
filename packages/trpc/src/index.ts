import { router } from "./config/trpc";
import { authRouter } from "./modules/auth/auth.routes";
import { roomRouter } from "./modules/room/room.routes";

export const appRouter = router({
	auth: authRouter,
	room: roomRouter,
});

export type Approuter = typeof appRouter;
