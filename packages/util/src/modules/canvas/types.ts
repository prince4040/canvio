import type z from "zod";
import type {
	addShapeSchema,
	rectangleShapeSchema,
	shapeSchema,
} from "./schema";

export type RectangleShapeSchemaType = z.infer<typeof rectangleShapeSchema>;
export type ShapeSchemaType = z.infer<typeof shapeSchema>;
export type AddShapeSchemaType = z.infer<typeof addShapeSchema>;
