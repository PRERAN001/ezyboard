import Toolbar from "@/components/board/Toolbar";
import Topbar from "@/components/board/Topbar";
import Canvas from "@/components/board/Canvas";
import Sidebar from "@/components/board/Sidebar";
import ZoomControls from "@/components/board/ZoomControls";

export default function RoomPage() {
  return (
    <main className="relative h-screen w-screen bg-slate-100 overflow-hidden">
      <Topbar />

      <Toolbar />

      <Canvas />

      

      <ZoomControls />
    </main>
  );
}