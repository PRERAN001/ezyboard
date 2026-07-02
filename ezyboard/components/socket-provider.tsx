"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [connected, setConnected] = useState(false);

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

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onError);

      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="fixed right-5 top-5 z-50">
        <div
          className={`rounded-full px-4 py-2 text-sm font-semibold shadow-lg ${
            connected
              ? "bg-emerald-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {connected ? "🟢 Connected" : "🔴 Disconnected"}
        </div>
      </div>

      {children}
    </>
  );
}