export default class Camera {
    x = 0;
    y = 0;
    zoom = 1;

    worldToScreen(point) {
        return {
            x: (point.x - this.x) * this.zoom,
            y: (point.y - this.y) * this.zoom,
        };
    }

    screenToWorld(point) {
        return {
            x: point.x / this.zoom + this.x,
            y: point.y / this.zoom + this.y,
        };
    }
}