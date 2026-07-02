import {
  MousePointer2,
  Pencil,
  Eraser,
  Square,
  Circle,
  Minus,
  ArrowRight,
  Type,
} from "lucide-react";

const tools = [
  MousePointer2,
  Pencil,
  Eraser,
  Square,
  Circle,
  Minus,
  ArrowRight,
  Type,
];

export default function Toolbar() {
  return (
    <div className="absolute left-5 top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-2 flex flex-col gap-2">
      {tools.map((Icon, index) => (
        <button
          key={index}
          className="p-2 rounded-lg hover:bg-slate-100"
        >
          <Icon size={20} />
        </button>
      ))}
    </div>
  );
}