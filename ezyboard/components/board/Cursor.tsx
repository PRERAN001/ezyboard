"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";

import CanvasEngine from "../canvas/CanvasEngine";
import SocketManager from "../network/SocketManager";
import { socket } from "@/lib/socket";

export default function Canvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { boardId } = useParams();

    useEffect(() => {

        if (!canvasRef.current) return;

        const engine = new CanvasEngine(canvasRef.current);

        const socketManager = new SocketManager(
            socket,
            engine,
            boardId as string
        );

        return () => {
            engine.destroy();
        };

    }, [boardId]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
        />
    );
}