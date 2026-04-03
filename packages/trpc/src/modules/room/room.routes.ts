import { authedProcedure, router } from "../../config/trpc";

export const roomRouter = router({
	create: authedProcedure.mutation(() => {}),
});
