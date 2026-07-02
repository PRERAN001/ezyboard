import { Socket } from "socket.io-client";
import CanvasEngine from "../canvas/CanvasEngine";
import { Point } from "../canvas/types";

export default class SocketManager {

    constructor(
        private socket: Socket,
        private engine: CanvasEngine,
        private boardId: string
    ) {

        this.registerOutgoing();

        this.registerIncoming();

    }

    private registerOutgoing() {

        this.engine.onStrokeStart = (
            strokeId,
            point,
            color,
            width,
            userId
        ) => {

            this.socket.emit("stroke-start", {
                boardId: this.boardId,
                strokeId,
                point,
                color,
                width,
                userId,
            });

        };

        this.engine.onStrokePoint = (
            strokeId,
            point
        ) => {

            this.socket.emit("stroke-point", {
                boardId: this.boardId,
                strokeId,
                point,
            });

        };

        this.engine.onStrokeEnd = (
            strokeId
        ) => {

            this.socket.emit("stroke-end", {
                boardId: this.boardId,
                strokeId,
            });

        };

    }

    private registerIncoming() {

        this.socket.on("stroke-start", (data) => {

            this.engine.startStroke(
                data.strokeId,
                data.point,
                data.color,
                data.width,
                data.userId
            );

        });

        this.socket.on("stroke-point", (data) => {

            this.engine.appendPoint(
                data.strokeId,
                data.point
            );

        });

        this.socket.on("stroke-end", (data) => {

            this.engine.finishStroke(
                data.strokeId
            );

        });

    }

}