import Tool from "./tool";

class EraserTool extends Tool {

    onMouseDown(point) {
        this.erase(point);
    }

    onMouseMove(point) {
        this.erase(point);
    }

    onMouseUp() {}

    erase(point) {
        const strokeId = this.engine.hitTestStroke(point);

        if (!strokeId) return;

        this.engine.removeStroke(strokeId);
    }

}

export default EraserTool;