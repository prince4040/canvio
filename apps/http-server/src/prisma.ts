import { createPrisma } from "@canvio/database";

const prismaObject = new createPrisma(
	"postgresql://postgres:postgres@localhost:5432/canvio",
);

export const prisma = prismaObject.getPrisma();
