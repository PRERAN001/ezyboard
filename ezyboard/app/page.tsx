"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Space_Grotesk, Inter } from "next/font/google";
import { socket } from "@/lib/socket";
import {
  ArrowRight,
  Link2,
  MousePointer2,
  Sparkles,
  Users,
  Zap,
  ShieldCheck,
  LayoutGrid,
  Hash,
  Terminal,
} from "lucide-react";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const CURSORS = [
  { name: "Aria", color: "#2563eb", top: "15%", left: "5%", delay: "0s" },
  { name: "Theo", color: "#0284c7", top: "75%", left: "8%", delay: "1.2s" },
  { name: "Nova", color: "#0ea5e9", top: "22%", left: "80%", delay: "0.6s" },
  { name: "Kai", color: "#3b82f6", top: "65%", left: "85%", delay: "1.8s" },
];

export default function Page() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joining, setJoining] = useState(false);

  const joinRoom = () => {
    if (!username || !room) return;
    setJoining(true);
    socket.emit("join-board", { username, boardId: room });
    router.push(`/room/${encodeURIComponent(room)}`);
  };

  useEffect(() => {
    socket.on("user-joined", (data) => {
      console.log(data);
    });
    return () => {
      socket.off("user-joined");
    };
  }, []);

  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen bg-[#fafbfc] text-slate-900 antialiased relative overflow-hidden select-none`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Engineers Technical Dot Matrix Canvas Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_100%,transparent_100%)] opacity-70" />

      {/* FLOATING CURSORS (Scattered cleanly across the canvas background) */}
      {CURSORS.map((c) => (
        <div
          key={c.name}
          className="cursor-float pointer-events-none absolute z-10 hidden items-center gap-1 md:flex"
          style={{ top: c.top, left: c.left, animationDelay: c.delay }}
        >
          <MousePointer2 size={14} style={{ color: c.color }} fill={c.color} />
          <span
            className="rounded-md border px-1.5 py-0.5 text-[10px] font-mono font-medium text-white shadow-sm"
            style={{ backgroundColor: c.color, borderColor: `${c.color}dd` }}
          >
            {c.name}.dev
          </span>
        </div>
      ))}

      {/* TOP TECHNICAL UTILITY HEADER */}
      <header className="relative z-20 border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider uppercase text-slate-800">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-white font-sans text-xs">B</span>
              board_engine_v1.0
            </div>
            <div className="hidden h-4 w-px bg-slate-200 md:block" />
            <div className="hidden items-center gap-2 rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-500 md:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              wss://active_nodes: 4.2k
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-slate-400 hidden sm:inline">Ctrl + K to search</span>
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            <div className="flex h-7 items-center rounded-md border border-slate-200 bg-white px-2 font-mono text-xs text-slate-600 shadow-sm">
              LATENCY &lt; 50ms
            </div>
          </div>
        </div>
      </header>

      {/* MAIN HARD-EDGE FOCUS INTERFACE */}
      <main className="relative z-20 mx-auto flex max-w-7xl flex-col items-center justify-center px-4 pt-16 pb-24">
        
        {/* Floating Context Panel Tooltip */}
        <div className="mb-8 flex items-center gap-2 rounded-lg border border-sky-100 bg-sky-50/60 px-3 py-1 font-mono text-xs text-blue-700">
          <Terminal size={12} />
          <span>await init_canvas_handshake()</span>
        </div>

        {/* Minimal Stark Title Block */}
        <div className="text-center max-w-xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            A shared board for engineers who hate bloat.
          </h1>
          <p className="mt-4 text-sm text-slate-500 max-w-md mx-auto">
            Zero accounts. Zero tracking. Just raw WebSockets synchronizing custom design grids instantly between terminals.
          </p>
        </div>

        {/* The Control Rig (Not a generic card, looks like a settings dock) */}
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <LayoutGrid size={16} className="text-blue-600" />
              <h2 className="text-sm font-bold tracking-tight text-slate-800" style={{ fontFamily: "var(--font-display)" }}>
                Session Terminal
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">auth_required</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1">Handle / Handle Name</label>
              <input
                type="text"
                placeholder="Sarah"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 font-mono text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1">Target Room Reference</label>
              <div className="relative">
                <Hash
                  size={12}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="alpha-sprint-2"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2 pl-8 pr-3 font-mono text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <button
              onClick={joinRoom}
              disabled={!username || !room || joining}
              className="group flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 text-xs font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-30 enabled:hover:bg-blue-600"
            >
              <span className="font-mono">{joining ? "connecting..." : "join_live_stream"}</span>
              <ArrowRight size={14} className="transition-transform group-enabled:group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Minimal Linear Feature Badges */}
        <div className="mt-16 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          <div className="flex gap-3 rounded-xl border border-slate-200/60 bg-white/60 p-4 backdrop-blur-sm">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-600">
              <Zap size={14} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 font-mono">50ms Global Sync</h3>
              <p className="mt-1 text-xs text-slate-500 leading-normal">Optimized canvas mutations pass cleanly via lightweight payload updates.</p>
            </div>
          </div>

          <div className="flex gap-3 rounded-xl border border-slate-200/60 bg-white/60 p-4 backdrop-blur-sm">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-600">
              <Users size={14} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 font-mono">Zero Persistent Storage</h3>
              <p className="mt-1 text-xs text-slate-500 leading-normal">Data routes purely ephemerally. Room instances close immediately upon exit.</p>
            </div>
          </div>

          <div className="flex gap-3 rounded-xl border border-slate-200/60 bg-white/60 p-4 backdrop-blur-sm">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-600">
              <ShieldCheck size={14} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 font-mono">Private Matrix Links</h3>
              <p className="mt-1 text-xs text-slate-500 leading-normal">No telemetry overlays. Strictly isolated workspaces hidden behind your key identifiers.</p>
            </div>
          </div>
        </div>

      </main>

      <style jsx>{`
        .cursor-float {
          animation: floaty 8s ease-in-out infinite;
        }
        @keyframes floaty {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(12px, -8px); }
        }
      `}</style>
    </div>
  );
}