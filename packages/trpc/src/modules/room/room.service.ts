import { DBErrorClient } from "@canvio/database";
import type {
	addMemberSchemaType,
	CreateRoomSchemaType,
	removeMenmberSchemaType,
} from "@canvio/util/room";
import { withCatch } from "@canvio/util/withCatch";
import { TRPCError } from "@trpc/server";
import type { ContextInnerType } from "../../config/context";

export async function createRoomService(
	input: CreateRoomSchemaType,
	ctx: ContextInnerType,
) {
	const userId = ctx.user?.id;

	if (!userId) {
		throw new TRPCError({
			code: "FORBIDDEN",
		});
	}

	const [roomError, roomResult] = await withCatch(
		ctx.db.room.create(input, userId),
		[DBErrorClient],
	);

	if (roomError) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: roomError.message,
		});
	}

	return {
		room: roomResult,
	};
}

export async function addMemberService(
	input: addMemberSchemaType,
	ctx: ContextInnerType,
) {
	const role = input.role;
	const roomId = input.roomId;
	const userId = ctx.user?.id;

	if (!userId) {
		throw new TRPCError({
			code: "FORBIDDEN",
		});
	}

	const [error, result] = await withCatch(
		ctx.db.room.addMember(userId, roomId, role),
		[DBErrorClient],
	);

	if (error) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: error.message,
		});
	}

	return {
		id: result.id,
		userId: result.userId,
		roomId: result.roomId,
		role: role,
	};
}

export async function removeMemberService(
	input: removeMenmberSchemaType,
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
			message: userError?.message || "user is not part of the room",
		});
	}

	if (userResult.role !== "ADMIN") {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "user is not authorised to perform this action",
		});
	}

	const [error, result] = await withCatch(
		ctx.db.room.removeMember(userId, roomId),
		[DBErrorClient],
	);

	if (error) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: error.message,
		});
	}

	return {
		userId,
		roomId: result.roomId,
	};
}
