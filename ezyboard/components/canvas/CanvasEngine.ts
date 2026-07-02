import Renderer from "./Renderer";
import Input from "./Input";
import { Point, Stroke, StrokeShape } from "./types";
import ToolManager from "./ToolManager";
import Camera from "./camera";
export default class CanvasEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private renderer: Renderer;
  private input: Input;
  private toolManager: ToolManager;
  private strokes = new Map<string, Stroke>();
  private camera: Camera;
  private activeTool = "pen";
  private brushColor = "#000000";
  private brushWidth = 3;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.toolManager = new ToolManager(this);
    const ctx = canvas.getContext("2d");
    this.camera = new Camera();

    if (!ctx) {
      throw new Error("Canvas not supported");
    }

    this.ctx = ctx;

    this.input = new Input(canvas);
    this.renderer = new Renderer(ctx, this.camera);


    this.resize();

    this.registerEvents();

    this.loop();
  }

  public onStrokeStart?: (
    strokeId: string,
    point: Point,
    color: string,
    width: number,
    userId: string,
    shape: StrokeShape,
  ) => void;

  public onStrokePoint?: (strokeId: string, point: Point) => void;

  public onStrokeEnd?: (strokeId: string) => void;

  public getBrushColor() {
    return this.brushColor;
  }

  public getBrushWidth() {
    return this.brushWidth;
  }

  public setBrushColor(color: string) {
    this.brushColor = color;
  }

  public setBrushWidth(width: number) {
    this.brushWidth = width;
  }

  public setTool(toolName: string) {
    this.activeTool = toolName;
    this.toolManager.setTool(toolName);
  }

  public getTool() {
    return this.activeTool;
  }


  public startStroke(
    strokeId: string,
    point: Point,
    color: string,
    width: number,
    userId: string,
    shape: StrokeShape = "freehand",
  ) {
    this.strokes.set(strokeId, {
      id: strokeId,
      userId,
      color,
      width,
      shape,
      points: [point],
    });
  }

  public appendPoint(strokeId: string, point: Point) {
    const stroke = this.strokes.get(strokeId);

    if (!stroke) return;

    if (stroke.shape && stroke.shape !== "freehand") {
      if (stroke.points.length < 2) {
        stroke.points.push(point);
      } else {
        stroke.points[stroke.points.length - 1] = point;
      }
      return;
    }

    stroke.points.push(point);
  }

  public finishStroke() {
    // Later:
    // socket emit
    // save to db
    // smoothing
  }

  public getStroke(strokeId: string) {
    return this.strokes.get(strokeId);
  }

  public removeStroke(strokeId: string) {
    this.strokes.delete(strokeId);
  }

  public hitTestStroke(point: Point) {
    const threshold = Math.max(this.brushWidth, 10);

    for (const stroke of Array.from(this.strokes.values()).reverse()) {
      if (stroke.shape === "line" && stroke.points.length >= 2) {
        if (this.distanceToSegment(point, stroke.points[0], stroke.points[1]) <= threshold) {
          return stroke.id;
        }
        continue;
      }

      if (stroke.shape === "rectangle" && stroke.points.length >= 2) {
        const [a, b] = stroke.points;
        const left = Math.min(a.x, b.x) - threshold;
        const right = Math.max(a.x, b.x) + threshold;
        const top = Math.min(a.y, b.y) - threshold;
        const bottom = Math.max(a.y, b.y) + threshold;

        if (point.x >= left && point.x <= right && point.y >= top && point.y <= bottom) {
          return stroke.id;
        }

        continue;
      }

      if (stroke.shape === "circle" && stroke.points.length >= 2) {
        const [a, b] = stroke.points;
        const center = {
          x: (a.x + b.x) / 2,
          y: (a.y + b.y) / 2,
        };
        const radius = Math.min(Math.abs(b.x - a.x), Math.abs(b.y - a.y)) / 2;
        const dist = Math.hypot(point.x - center.x, point.y - center.y);

        if (Math.abs(dist - radius) <= threshold) {
          return stroke.id;
        }

        continue;
      }

      for (const p of stroke.points) {
        const dx = p.x - point.x;
        const dy = p.y - point.y;

        if (Math.hypot(dx, dy) <= threshold) {
          return stroke.id;
        }
      }
    }

    return null;
  }

  private distanceToSegment(point: Point, start: Point, end: Point) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;

    if (dx === 0 && dy === 0) {
      return Math.hypot(point.x - start.x, point.y - start.y);
    }

    const t = Math.max(
      0,
      Math.min(
        1,
        ((point.x - start.x) * dx + (point.y - start.y) * dy) / (dx * dx + dy * dy),
      ),
    );

    const projection = {
      x: start.x + t * dx,
      y: start.y + t * dy,
    };

    return Math.hypot(point.x - projection.x, point.y - projection.y);
  }

  // ------------------------------------------------
  // Resize
  // ------------------------------------------------

  private resize = () => {
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = this.canvas.clientWidth * dpr;

    this.canvas.height = this.canvas.clientHeight * dpr;

    this.ctx.scale(dpr, dpr);
  };



  // ------------------------------------------------
  // Events
  // ------------------------------------------------

  private registerEvents() {
    window.addEventListener("resize", this.resize);

    window.addEventListener("board:tool-change", this.onToolChange as EventListener);
    window.addEventListener("board:brush-change", this.onBrushChange as EventListener);

    this.canvas.addEventListener("mousedown", this.onMouseDown);

    window.addEventListener("mousemove", this.onMouseMove);

    window.addEventListener("mouseup", this.onMouseUp);
  }

  private onToolChange = (event: Event) => {
    const customEvent = event as CustomEvent<{ tool: string }>;
    if (!customEvent.detail?.tool) return;

    this.setTool(customEvent.detail.tool);
  };

  private onBrushChange = (event: Event) => {
    const customEvent = event as CustomEvent<{ color?: string; width?: number }>;

    if (customEvent.detail?.color) {
      this.setBrushColor(customEvent.detail.color);
    }

    if (typeof customEvent.detail?.width === "number") {
      this.setBrushWidth(customEvent.detail.width);
    }
  };

  private onMouseDown = (e: MouseEvent) => {
    const point = this.input.getMousePosition(e);

    this.toolManager.handleMouseDown(point);
  };

  private onMouseMove = (e: MouseEvent) => {
    const point = this.input.getMousePosition(e);

    this.toolManager.handleMouseMove(point);
  };

  private onMouseUp = () => {
    this.toolManager.handleMouseUp();
  };

  // ------------------------------------------------
  // Render Loop
  // ------------------------------------------------

  private loop = () => {
    this.renderer.render(
      this.canvas.clientWidth,
      this.canvas.clientHeight,
      Array.from(this.strokes.values()),
    );

    requestAnimationFrame(this.loop);
  };

  destroy() {
    window.removeEventListener("resize", this.resize);

    window.removeEventListener("board:tool-change", this.onToolChange as EventListener);
    window.removeEventListener("board:brush-change", this.onBrushChange as EventListener);

    this.canvas.removeEventListener("mousedown", this.onMouseDown);

    window.removeEventListener("mousemove", this.onMouseMove);

    window.removeEventListener("mouseup", this.onMouseUp);
  }
}
