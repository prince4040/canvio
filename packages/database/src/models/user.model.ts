import type { zod } from "@canvio/util/zod";
import { Model } from "./base.model";

export class UserModel extends Model {
	getUserById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id,
			},
		});
	}

	createUser(user: zod.signupType) {
		return this.prisma.user.create({
			data: {
				...user,
			},
		});
	}
}
