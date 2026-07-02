"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";

import CanvasEngine from "../canvas/CanvasEngine";
import SocketManager from "../network/SocketManager";
import { socket } from "@/lib/socket";

export default function Canvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { roomId } = useParams<{ roomId: string }>();

    useEffect(() => {

        if (!canvasRef.current) return;

        const engine = new CanvasEngine(canvasRef.current);

        new SocketManager(
            socket,
            engine,
            roomId
        );

        return () => {
            socket.off("stroke-start");
            socket.off("stroke-point");
            socket.off("stroke-end");
            engine.destroy();
        };

    }, [roomId]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
        />
    );
}