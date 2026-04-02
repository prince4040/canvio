import type { SignupSchemaType } from "@canvio/util/auth";
import { Model } from "./base.model";

export class UserModel extends Model {
	getUserById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id,
			},
		});
	}

	getUserByEmail(email: string) {
		return this.prisma.user.findFirst({
			where: {
				email,
			},
		});
	}

	createUser(user: SignupSchemaType) {
		return this.prisma.user.create({
			data: {
				...user,
			},
		});
	}
}
