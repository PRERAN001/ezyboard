"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { socket } from "@/lib/socket";

type Toast = {
  id: number;
  message: string;
};

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [connected, setConnected] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);

  const pushToast = useMemo(() => {
    return (message: string) => {
      const id = ++toastIdRef.current;

      setToasts((current) => [...current, { id, message }]);

      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, 3000);
    };
  }, []);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      console.log("✅ Connected:", socket.id);
      setConnected(true);
    }

    function onDisconnect() {
      console.log("❌ Disconnected");
      setConnected(false);
    }

    function onError(err: Error) {
      console.error(err);
    }

    function onUserJoined(data: { username?: string; boardId?: string }) {
      if (!data?.username) return;

      pushToast(`${data.username} joined this room`);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onError);
    socket.on("user-joined", onUserJoined);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onError);
      socket.off("user-joined", onUserJoined);

      socket.disconnect();
    };
  }, [pushToast]);

  return (
    <>
      <div className="fixed right-6 top-6 z-50 flex w-[320px] max-w-[calc(100vw-3rem)] flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto animate-in slide-in-from-right-3 fade-in rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-sm shadow-lg backdrop-blur-md"
          >
            <span className="font-semibold text-slate-900">{toast.message}</span>
          </div>
        ))}
      </div>

      <div className="fixed right-6 bottom-6 z-50 select-none pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/90 px-3.5 py-2 font-mono text-xs shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md transition-all duration-300">
          {/* Dynamic Status Beacon */}
          <div className="relative flex h-2 w-2">
            {connected && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex h-2 w-2 rounded-full transition-colors duration-500 ${
                connected ? "bg-emerald-500" : "bg-rose-500 animate-pulse"
              }`}
            />
          </div>

          {/* Telemetry Metrics Line */}
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="font-semibold text-slate-900">
              {connected ? "NODE_ONLINE" : "NODE_OFFLINE"}
            </span>
            <span className="text-slate-300">//</span>
            <span className="text-slate-400 text-[11px]">
              {connected ? "PORT_ACTIVE" : "ERR_SOCKET_DISC"}
            </span>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
