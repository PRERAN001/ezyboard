import Tool from "./tool";

class LineTool extends Tool {

    constructor(engine) {
        super(engine);
        this.strokeId = null;
    }

    onMouseDown(point) {

        this.strokeId = crypto.randomUUID();

        this.engine.startStroke(
            this.strokeId,
            point,
            this.engine.getBrushColor(),
            this.engine.getBrushWidth(),
            "local",
            "line"
        );

        this.engine.onStrokeStart?.(
            this.strokeId,
            point,
            this.engine.getBrushColor(),
            this.engine.getBrushWidth(),
            "local",
            "line"
        );

    }

    onMouseMove(point) {

        if (!this.strokeId) return;

        this.engine.appendPoint(this.strokeId, point);
        this.engine.onStrokePoint?.(this.strokeId, point);

    }

    onMouseUp() {

        if (!this.strokeId) return;

        this.engine.finishStroke();
        this.engine.onStrokeEnd?.(this.strokeId);

        this.strokeId = null;

    }

}

export default LineTool;