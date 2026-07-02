import { Minus, Plus } from "lucide-react";

export default function ZoomControls() {
  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg flex items-center gap-3 px-4 py-2">

      <button>
        <Minus />
      </button>

      <span>100%</span>

      <button>
        <Plus />
      </button>

    </div>
  );
}