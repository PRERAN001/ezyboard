import PenTool from "./tools/pentool";

class ToolManager {

    constructor(engine) {

        this.engine = engine;

        this.currentTool = new PenTool(engine);

    }

    setTool(tool) {
        this.currentTool = tool;
    }

    getTool() {
        return this.currentTool;
    }

    handleMouseDown(point) {
        this.currentTool.onMouseDown(point);
    }

    handleMouseMove(point) {
        this.currentTool.onMouseMove(point);
    }

    handleMouseUp(point) {
        this.currentTool.onMouseUp(point);
    }

}

export default ToolManager;