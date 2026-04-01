import type { signupSchemaType } from "@canvio/util/auth";
import { Model } from "./base.model";

export class UserModel extends Model {
	getUserById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id,
			},
		});
	}

	createUser(user: signupSchemaType) {
		return this.prisma.user.create({
			data: {
				...user,
			},
		});
	}
}
