import Renderer from "./Renderer";
import Input from "./Input";
import { Point, Stroke } from "./types";
import ToolManager from "./ToolManager";
export default class CanvasEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private renderer: Renderer;
  private input: Input;
    private toolManager: ToolManager;
  private strokes = new Map<string, Stroke>();

  private drawing = false;
  private currentStrokeId: string | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.toolManager = new ToolManager(this);
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Canvas not supported");
    }

    this.ctx = ctx;

    this.renderer = new Renderer(ctx);
    this.input = new Input(canvas);

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
  ) => void;

  public onStrokePoint?: (strokeId: string, point: Point) => void;

  public onStrokeEnd?: (strokeId: string) => void;


  public startStroke(
    strokeId: string,
    point: Point,
    color: string,
    width: number,
    userId: string,
  ) {
    this.strokes.set(strokeId, {
      id: strokeId,
      userId,
      color,
      width,
      points: [point],
    });
  }

  public appendPoint(strokeId: string, point: Point) {
    const stroke = this.strokes.get(strokeId);

    if (!stroke) return;

    stroke.points.push(point);
  }

  public finishStroke(strokeId: string) {
    // Later:
    // socket emit
    // save to db
    // smoothing
  }

  public getStroke(strokeId: string) {
    return this.strokes.get(strokeId);
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

    this.canvas.addEventListener("mousedown", this.onMouseDown);

    window.addEventListener("mousemove", this.onMouseMove);

    window.addEventListener("mouseup", this.onMouseUp);
  }

  private onMouseDown = (e: MouseEvent) => {
    this.drawing = true;

    const point = this.input.getMousePosition(e);

    const id = crypto.randomUUID();

    this.currentStrokeId = id;

    this.startStroke(id, point, "#000", 3, "local");

    this.onStrokeStart?.(id, point, "#000", 3, "local");
    this.toolManager.handleMouseDown(point);
  };

  private onMouseMove = (e: MouseEvent) => {
    if (!this.drawing || !this.currentStrokeId) return;

    const point = this.input.getMousePosition(e);

    this.appendPoint(this.currentStrokeId, point);
    this.onStrokePoint?.(this.currentStrokeId, point);
    this.toolManager.handleMouseMove(point);
  };

  private onMouseUp = () => {
    if (!this.currentStrokeId) return;

    this.finishStroke(this.currentStrokeId);
    this.onStrokeEnd?.(this.currentStrokeId);
    this.toolManager.handleMouseUp();


    this.currentStrokeId = null;

    this.drawing = false;
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

    this.canvas.removeEventListener("mousedown", this.onMouseDown);

    window.removeEventListener("mousemove", this.onMouseMove);

    window.removeEventListener("mouseup", this.onMouseUp);
  }
}
