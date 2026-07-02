"use client";

import {
  MousePointer,
  Pencil,
  Eraser,
  Palette,
  Minus,
  Square,
  Circle,
} from "lucide-react";
import { useEffect, useState } from "react";

const TOOL_OPTIONS = [
  { id: "select", label: "Select", icon: MousePointer },
  { id: "pen", label: "Pen", icon: Pencil },
  { id: "eraser", label: "Eraser", icon: Eraser },
  { id: "line", label: "Line", icon: Minus },
  { id: "rectangle", label: "Rect", icon: Square },
  { id: "circle", label: "Circle", icon: Circle },
] as const;

const COLORS = ["#000000", "#0A5FD9", "#22B8B0", "#FF5A5F", "#F59E0B"];

const WIDTHS = [2, 3, 5, 8];

type ToolId = (typeof TOOL_OPTIONS)[number]["id"];

export default function Toolbar() {
  const [activeTool, setActiveTool] = useState<ToolId>("pen");
  const [color, setColor] = useState(COLORS[1]);
  const [width, setWidth] = useState(3);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("board:tool-change", {
        detail: { tool: activeTool },
      })
    );
  }, [activeTool]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("board:brush-change", {
        detail: { color, width },
      })
    );
  }, [color, width]);

  return (
    <div className="absolute left-5 top-1/2 -translate-y-1/2 flex w-64 flex-col gap-3 rounded-2xl border border-black/10 bg-white p-3 shadow-xl">
      <div className="grid grid-cols-3 gap-2">
        {TOOL_OPTIONS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTool === id;

          return (
            <button
              key={id}
              onClick={() => setActiveTool(id)}
              className={`flex flex-col items-center gap-1 rounded-xl px-2 py-3 text-xs font-medium transition ${
                isActive
                  ? "bg-[#0A5FD9] text-white shadow-md"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl bg-slate-50 p-3">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Palette size={14} />
          Brush
        </div>

        <div className="flex flex-wrap gap-2">
          {COLORS.map((swatch) => (
            <button
              key={swatch}
              onClick={() => setColor(swatch)}
              className={`h-7 w-7 rounded-full border-2 transition ${
                color === swatch ? "border-slate-900 scale-110" : "border-white"
              }`}
              style={{ backgroundColor: swatch }}
              aria-label={`Set brush color ${swatch}`}
            />
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2">
          {WIDTHS.map((item) => (
            <button
              key={item}
              onClick={() => setWidth(item)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                width === item
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-200"
              }`}
            >
              {item}px
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}