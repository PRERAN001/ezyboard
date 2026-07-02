import PenTool from "./tools/pentool";
import EraserTool from "./tools/erasertool";
import SelectTool from "./tools/selecttool";
import LineTool from "./tools/linetool";
import RectangleTool from "./tools/rectangletool";
import CircleTool from "./tools/circletool";

class ToolManager {

    constructor(engine) {

        this.engine = engine;

        this.currentToolName = "pen";
        this.currentTool = new PenTool(engine);

    }

    setTool(toolName) {

        this.currentToolName = toolName;

        if (toolName === "eraser") {
            this.currentTool = new EraserTool(this.engine);
            return;
        }

        if (toolName === "select") {
            this.currentTool = new SelectTool(this.engine);
            return;
        }

        if (toolName === "line") {
            this.currentTool = new LineTool(this.engine);
            return;
        }

        if (toolName === "rectangle") {
            this.currentTool = new RectangleTool(this.engine);
            return;
        }

        if (toolName === "circle") {
            this.currentTool = new CircleTool(this.engine);
            return;
        }

        this.currentTool = new PenTool(this.engine);

    }

    getTool() {
        return this.currentTool;
    }

    getToolName() {
        return this.currentToolName;
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