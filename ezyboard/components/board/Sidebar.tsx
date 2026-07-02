export default function Sidebar() {
  return (
    <aside className="absolute top-16 right-0 h-[calc(100%-64px)] w-72 bg-white border-l shadow-lg">

      <div className="p-5">

        <h2 className="font-semibold">
          Chat
        </h2>

        <div className="mt-4 space-y-3">

          <div className="bg-slate-100 rounded-lg p-3">
            Hello 👋
          </div>

          <div className="bg-slate-100 rounded-lg p-3">
            Welcome to the room.
          </div>

        </div>

      </div>

    </aside>
  );
}