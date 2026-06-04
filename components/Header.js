const labels = {
  dashboard: "Dashboard HR", karyawan: "Manajemen Karyawan",
  absensi: "Absensi Harian", penggajian: "Penggajian",
  cuti: "Manajemen Cuti", pengaturan: "Pengaturan",
};

export default function Header({ active }) {
  const today = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
      <div>
        <h1 className="text-lg font-bold text-slate-800">{labels[active]}</h1>
        <p className="text-xs text-slate-400">{today}</p>
      </div>
      <div className="flex items-center gap-4">
        <input placeholder="Cari karyawan..." className="bg-slate-100 rounded-xl px-4 py-2 text-sm outline-none w-48 focus:ring-2 focus:ring-emerald-200 focus:bg-white transition-all" />
        <button className="relative w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors">
          🔔
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">2</span>
        </button>
        <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">HR</div>
      </div>
    </header>
  );
}
