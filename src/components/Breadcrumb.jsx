export default function Breadcrumb() {
  return (
    <div className="bg-brand-yellow py-2.5">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        <nav className="flex items-center gap-2 text-[12px] font-bold text-slate-800">
          <span className="opacity-70 transition hover:opacity-100 cursor-pointer">Home</span>
          <span className="text-[10px]">›</span>
          <span className="opacity-100 transition cursor-default">All Data</span>
          <span className="text-[10px]">›</span>
        </nav>
      </div>
    </div>
  );
}
