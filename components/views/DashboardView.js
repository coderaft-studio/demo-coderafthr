const stats = [
  { label: "Total Karyawan", value: "128", change: "+4 bulan ini", icon: "👥", color: "bg-emerald-50 text-emerald-600" },
  { label: "Hadir Hari Ini", value: "112", change: "87.5% kehadiran", icon: "✅", color: "bg-blue-50 text-blue-600" },
  { label: "Cuti Aktif", value: "8", change: "6 pending approval", icon: "🏖", color: "bg-amber-50 text-amber-600" },
  { label: "Kontrak Habis", value: "3", change: "dalam 30 hari", icon: "⚠️", color: "bg-red-50 text-red-600" },
];

const depts = [
  { nama: "Engineering", jumlah: 32, pct: 100 },
  { nama: "Marketing", jumlah: 24, pct: 75 },
  { nama: "Operasional", jumlah: 28, pct: 87 },
  { nama: "Finance", jumlah: 18, pct: 56 },
  { nama: "HR & Admin", jumlah: 14, pct: 44 },
  { nama: "Sales", jumlah: 12, pct: 37 },
];

const karyawanBaru = [
  { nama: "Rini Handayani", dept: "Engineering", jabatan: "Frontend Developer", masuk: "01 Jun 2026", avatar: "RH" },
  { nama: "Budi Prasetyo", dept: "Marketing", jabatan: "Digital Marketer", masuk: "28 Mei 2026", avatar: "BP" },
  { nama: "Sinta Maharani", dept: "Finance", jabatan: "Financial Analyst", masuk: "25 Mei 2026", avatar: "SM" },
  { nama: "Fajar Nugroho", dept: "Sales", jabatan: "Sales Executive", masuk: "20 Mei 2026", avatar: "FN" },
];

const avatarColor = ["bg-emerald-500", "bg-blue-500", "bg-violet-500", "bg-amber-500"];

export default function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-xl mb-3`}>{s.icon}</div>
            <div className="text-3xl font-bold text-slate-800 mb-1">{s.value}</div>
            <div className="text-slate-400 text-xs mb-1">{s.label}</div>
            <div className="text-emerald-600 text-xs font-semibold">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Dept chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-800">Karyawan per Departemen</h3>
              <p className="text-slate-400 text-xs">Total 128 karyawan aktif</p>
            </div>
          </div>
          <div className="space-y-4">
            {depts.map((d) => (
              <div key={d.nama}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-700 font-medium">{d.nama}</span>
                  <span className="text-slate-400">{d.jumlah} orang</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance today */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Status Kehadiran Hari Ini</h3>
          <div className="space-y-3">
            {[
              { label: "Hadir", val: 112, color: "bg-emerald-500", pct: 87 },
              { label: "Telat", val: 6, color: "bg-amber-400", pct: 5 },
              { label: "Izin / Sakit", val: 6, color: "bg-blue-400", pct: 5 },
              { label: "Alpha", val: 4, color: "bg-red-400", pct: 3 },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.color}`} />
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="font-semibold text-slate-800">{item.val}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-emerald-50 rounded-xl text-center">
            <div className="text-3xl font-bold text-emerald-600">87.5%</div>
            <div className="text-emerald-700 text-sm font-medium">Tingkat Kehadiran</div>
          </div>
        </div>
      </div>

      {/* Karyawan baru */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Karyawan Baru</h3>
          <button className="text-emerald-600 text-sm font-semibold hover:text-emerald-500">Lihat Semua →</button>
        </div>
        <div className="divide-y divide-slate-100">
          {karyawanBaru.map((k, i) => (
            <div key={k.nama} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className={`w-10 h-10 ${avatarColor[i]} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                {k.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-800 text-sm">{k.nama}</div>
                <div className="text-slate-400 text-xs">{k.jabatan} · {k.dept}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Mulai</div>
                <div className="text-sm font-medium text-slate-600">{k.masuk}</div>
              </div>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">Baru</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
