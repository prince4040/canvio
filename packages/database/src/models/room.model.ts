import type { UserRoleType } from "@canvio/util/auth";
import type { CreateRoomSchemaType } from "@canvio/util/room";
import { Model } from "./base.model";

export class RoomModel extends Model {
	create(room: CreateRoomSchemaType, userId: string) {
		return this.prisma.room.create({
			data: {
				name: room.name,

				membership: {
					create: {
						userId: userId,
						role: "ADMIN",
					},
				},
			},
		});
	}

	addMember(userId: string, roomId: string, role: UserRoleType) {
		return this.prisma.usersInRoom.create({
			data: {
				userId,
				roomId,
				role: role.toUpperCase() as Uppercase<UserRoleType>,
			},
		});
	}

	removeMember(userId: string, roomId: string) {
		return this.prisma.usersInRoom.delete({
			where: {
				userId_roomId: {
					userId: userId,
					roomId: roomId,
				},
			},
		});
	}

	getUserInRoom(userId: string, roomId: string) {
		return this.prisma.usersInRoom.findUnique({
			where: {
				userId_roomId: {
					userId,
					roomId,
				},
			},
		});
	}
}
