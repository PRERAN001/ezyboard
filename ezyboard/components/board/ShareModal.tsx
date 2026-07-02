export default function ShareModal() {
  return (
    <div className="fixed inset-0 bg-black/40 hidden items-center justify-center">

      <div className="bg-white rounded-xl p-6 w-96">

        <h2 className="text-xl font-bold">
          Share Room
        </h2>

        <input
          className="w-full mt-4 border rounded-lg p-3"
          value="https://yourdomain.com/room/abc123"
          readOnly
        />

        <button className="w-full mt-4 bg-blue-500 text-white rounded-lg py-3">
          Copy Link
        </button>

      </div>

    </div>
  );
}