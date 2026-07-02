import Tool from "./tool";

class PenTool extends Tool {

    constructor(engine) {
        super(engine);

        this.strokeId = null;
    }

    onMouseDown(point) {

        this.strokeId = crypto.randomUUID();

        this.engine.startStroke(
            this.strokeId,
            point,
            "#000",
            3,
            "local"
        );

        this.engine.onStrokeStart?.(
            this.strokeId,
            point,
            "#000",
            3,
            "local"
        );

    }

    onMouseMove(point) {

        if (!this.strokeId) return;

        this.engine.appendPoint(
            this.strokeId,
            point
        );

        this.engine.onStrokePoint?.(
            this.strokeId,
            point
        );

    }

    onMouseUp() {

        if (!this.strokeId) return;

        this.engine.finishStroke(this.strokeId);

        this.engine.onStrokeEnd?.(
            this.strokeId
        );

        this.strokeId = null;

    }

}

export default PenTool;