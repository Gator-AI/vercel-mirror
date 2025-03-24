export default function LoadingScreen() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen bg-[#00272b] text-white">
      <div className="animate-spin w-16 h-16 border-4 border-white border-t-transparent rounded-full"></div>
      <p className="mt-4 text-lg font-semibold">Loading...</p>
    </div>
  );
}
