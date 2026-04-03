import { addShapeSchema } from "@canvio/util/canvas";
import { authedProcedure, router } from "../../config/trpc";
import { addShapeService } from "./canvas.service";

export const canvasRouter = router({
	addShape: authedProcedure
		.input(addShapeSchema)
		.mutation(async ({ input, ctx }) => {
			const result = await addShapeService(input, ctx);

			return {
				sucess: true,
				data: {
					shape: {
						id: result.id,
						type: result.type,
					},
				},
			};
		}),
});
