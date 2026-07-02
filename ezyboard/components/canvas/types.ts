export interface Point {
    x: number;
    y: number;
}

export type StrokeShape = "freehand" | "line" | "rectangle" | "circle";

export interface Stroke {
    id: string;
    userId: string;
    color: string;
    width: number;
    shape?: StrokeShape;
    points: Point[];
}