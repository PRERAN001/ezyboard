import Camera from "./camera";

type Point = {
  x: number;
  y: number;
};

type Stroke = {
  id: string;
  userId: string;
  color: string;
  width: number;
  shape?: "freehand" | "line" | "rectangle" | "circle";
  points: Point[];
};

export default class Renderer {
  private ctx: CanvasRenderingContext2D;
  private camera: Camera;

  constructor(ctx: CanvasRenderingContext2D, camera: Camera) {
    this.ctx = ctx;
    this.camera = camera;
  }

  clear(width: number, height: number) {
    this.ctx.clearRect(0, 0, width, height);
  }

  private drawStroke(stroke: Stroke) {
    if (stroke.points.length < 2) return;

    this.ctx.strokeStyle = stroke.color;
    this.ctx.lineWidth = stroke.width;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    const start = this.camera.worldToScreen(stroke.points[0]);
    const end = this.camera.worldToScreen(stroke.points[stroke.points.length - 1]);

    this.ctx.beginPath();

    if (stroke.shape === "rectangle") {
      this.ctx.rect(
        Math.min(start.x, end.x),
        Math.min(start.y, end.y),
        Math.abs(end.x - start.x),
        Math.abs(end.y - start.y)
      );
      this.ctx.stroke();
      return;
    }

    if (stroke.shape === "circle") {
      const cx = (start.x + end.x) / 2;
      const cy = (start.y + end.y) / 2;
      const radius = Math.min(Math.abs(end.x - start.x), Math.abs(end.y - start.y)) / 2;

      this.ctx.ellipse(cx, cy, radius, radius, 0, 0, Math.PI * 2);
      this.ctx.stroke();
      return;
    }

    if (stroke.shape === "line") {
      this.ctx.moveTo(start.x, start.y);
      this.ctx.lineTo(end.x, end.y);
      this.ctx.stroke();
      return;
    }

    this.ctx.moveTo(start.x, start.y);

    for (let i = 1; i < stroke.points.length; i++) {
      const p = this.camera.worldToScreen(stroke.points[i]);

      this.ctx.lineTo(p.x, p.y);
    }

    this.ctx.stroke();
  }

  render(width: number, height: number, strokes: Stroke[]) {
    this.clear(width, height);

    for (const stroke of strokes) {
      this.drawStroke(stroke);
    }
  }
}
