import { z } from "zod";

export const rectangleShapeSchema = z.object({
	type: z.literal("RECTANGLE"),
	startX: z.number(),
	startY: z.number(),
	width: z.number(),
	height: z.number(),
});

export const circleShapeSchema = z.object({
	type: z.literal("Circle"),
	radius: z.number(),
});

export const shapeSchema = z.discriminatedUnion("type", [rectangleShapeSchema]);

export const addShapeSchema = z.object({
	roomId: z.string(),
	shape: shapeSchema,
});
