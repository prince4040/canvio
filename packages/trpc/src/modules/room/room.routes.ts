import {
	addMemberSchema,
	createRoomSchema,
	removeMemberSchema,
} from "@canvio/util/room";
import { authedProcedure, router } from "../../config/trpc";
import {
	addMemberService,
	createRoomService,
	removeMemberService,
} from "./room.service";

export const roomRouter = router({
	create: authedProcedure
		.input(createRoomSchema)
		.mutation(async ({ input, ctx }) => {
			const result = await createRoomService(input, ctx);

			return {
				sucess: true,
				room: result.room,
			};
		}),

	addMember: authedProcedure
		.input(addMemberSchema)
		.mutation(async ({ input, ctx }) => {
			const result = await addMemberService(input, ctx);

			return {
				sucess: true,
				message: "user added to the room",
				data: {
					user: {
						id: result.userId,
					},
					room: {
						id: result.roomId,
					},
					role: result.role,
				},
			};
		}),

	removeMember: authedProcedure
		.input(removeMemberSchema)
		.mutation(async ({ input, ctx }) => {
			await removeMemberService(input, ctx);

			return {
				sucess: true,
				message: "member removed from the room",
			};
		}),
});
