import type { ShapeSchemaType } from "@canvio/util/canvas";
import { Model } from "./base.model";

export class CanvasModel extends Model {
	addShape(shape: ShapeSchemaType, userId: string, roomId: string) {
		switch (shape.type) {
			case "RECTANGLE": {
				const { startX, startY, width, height } = shape;

				return this.prisma.shape.create({
					data: {
						type: "RECTANGLE",
						userId,
						roomId,
						startX,
						startY,
						width,
						height,
					},
				});
			}
		}
	}
}
