import { DBErrorClient } from "@canvio/database";
import type { AddShapeSchemaType } from "@canvio/util/canvas";
import { withCatch } from "@canvio/util/withCatch";
import { TRPCError } from "@trpc/server";
import type { ContextInnerType } from "../../config/context";

export async function addShapeService(
	input: AddShapeSchemaType,
	ctx: ContextInnerType,
) {
	const userId = ctx.user?.id;
	const roomId = input.roomId;

	if (!userId) {
		throw new TRPCError({
			code: "FORBIDDEN",
		});
	}
	const [userError, userResult] = await withCatch(
		ctx.db.room.getUserInRoom(userId, roomId),
		[DBErrorClient],
	);

	if (userError || userResult == null) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: userError?.message || "user is not part of this room",
		});
	}

	if (userResult.role !== "ADMIN" && userResult.role !== "WRITER") {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "user is not authorized to perform this action",
		});
	}

	const [shapeError, shapeResult] = await withCatch(
		ctx.db.canvas.addShape(input.shape, userId, roomId),
		[DBErrorClient],
	);

	if (shapeError) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: shapeError.message,
		});
	}

	return {
		id: shapeResult.id,
		type: shapeResult.type,
	};
}
