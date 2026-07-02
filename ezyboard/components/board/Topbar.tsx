import { Copy, Share2, Users } from "lucide-react";

export default function Topbar() {
  return (
    <header className="absolute top-0 left-0 w-full h-16 bg-white border-b flex items-center justify-between px-6 z-20">

      <h1 className="font-bold text-xl">
        WhiteBoard
      </h1>

      <div className="flex items-center gap-3">

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border">
          <Copy size={18} />
          Copy Link
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border">
          <Users size={18} />
          Users
        </button>

        <button className="p-2 rounded-lg border">
          <Share2 />
        </button>

      </div>

    </header>
  );
}