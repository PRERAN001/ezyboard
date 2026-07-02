import { Stroke } from "./types";

export default class Renderer {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  clear(width: number, height: number) {
    this.ctx.clearRect(0, 0, width, height);
  }

  private drawStroke(stroke: Stroke) {
    if (stroke.points.length < 2) return;

    this.ctx.beginPath();

    this.ctx.strokeStyle = stroke.color;
    this.ctx.lineWidth = stroke.width;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    this.ctx.moveTo(
      stroke.points[0].x,
      stroke.points[0].y
    );

    for (let i = 1; i < stroke.points.length; i++) {
      this.ctx.lineTo(
        stroke.points[i].x,
        stroke.points[i].y
      );
    }

    this.ctx.stroke();
  }

  render(
    width: number,
    height: number,
    strokes: Stroke[]
  ) {
    this.clear(width, height);

    for (const stroke of strokes) {
      this.drawStroke(stroke);
    }
  }
}