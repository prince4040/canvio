import { PrismaPg } from "@prisma/adapter-pg";
import { type ExtendedPrismaClient, initPrismaClient } from "../config/client";
import { CanvasModel } from "../models/canvas.model";
import { RoomModel } from "../models/room.model";
import { UserModel } from "../models/user.model";

declare global {
	var prisma: ExtendedPrismaClient | undefined;
}

export class PrismaService {
	private readonly prisma: ExtendedPrismaClient;
	public readonly user: UserModel;
	public readonly room: RoomModel;
	public readonly canvas: CanvasModel;

	constructor(connectionString: string) {
		if (!globalThis.prisma) {
			const adapter = new PrismaPg({ connectionString });
			const prisma = initPrismaClient(adapter);

			globalThis.prisma = prisma;
		}
		this.prisma = globalThis.prisma;
		this.user = new UserModel(this.prisma);
		this.room = new RoomModel(this.prisma);
		this.canvas = new CanvasModel(this.prisma);
	}

	getPrisma() {
		return this.prisma;
	}
}
