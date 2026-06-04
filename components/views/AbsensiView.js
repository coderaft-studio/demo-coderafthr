"use client";
import { useState } from "react";

const initData = [
  { id: "EMP-001", nama: "Rini Handayani", dept: "Engineering", masuk: "08:02", keluar: "17:05", status: "Hadir", avatar: "RH", color: "bg-emerald-500" },
  { id: "EMP-002", nama: "Budi Prasetyo", dept: "Marketing", masuk: "09:15", keluar: "18:00", status: "Telat", avatar: "BP", color: "bg-blue-500" },
  { id: "EMP-003", nama: "Sinta Maharani", dept: "Finance", masuk: "-", keluar: "-", status: "Izin", avatar: "SM", color: "bg-violet-500" },
  { id: "EMP-004", nama: "Fajar Nugroho", dept: "Sales", masuk: "08:45", keluar: "-", status: "Hadir", avatar: "FN", color: "bg-amber-500" },
  { id: "EMP-005", nama: "Dewi Kusuma", dept: "HR & Admin", masuk: "-", keluar: "-", status: "Alpha", avatar: "DK", color: "bg-pink-500" },
  { id: "EMP-006", nama: "Hendra Jaya", dept: "Engineering", masuk: "07:58", keluar: "17:00", status: "Hadir", avatar: "HJ", color: "bg-indigo-500" },
  { id: "EMP-007", nama: "Ahmad Rizky", dept: "Operasional", masuk: "08:00", keluar: "17:00", status: "Hadir", avatar: "AR", color: "bg-teal-500" },
  { id: "EMP-008", nama: "Lina Santoso", dept: "Marketing", masuk: "-", keluar: "-", status: "Sakit", avatar: "LS", color: "bg-rose-500" },
];

const statusOpts = ["Hadir", "Telat", "Izin", "Sakit", "Alpha"];
const statusStyle = {
  Hadir:  "bg-emerald-100 text-emerald-700",
  Telat:  "bg-amber-100 text-amber-700",
  Izin:   "bg-blue-100 text-blue-700",
  Sakit:  "bg-purple-100 text-purple-700",
  Alpha:  "bg-red-100 text-red-700",
};

export default function AbsensiView() {
  const [data, setData] = useState(initData);
  const [filter, setFilter] = useState("Semua");

  const updateStatus = (id, newStatus) => {
    setData(data.map((d) => {
      if (d.id !== id) return d;
      const now = new Date().toTimeString().slice(0, 5);
      return {
        ...d, status: newStatus,
        masuk: ["Hadir", "Telat"].includes(newStatus) && d.masuk === "-" ? now : d.masuk,
      };
    }));
  };

  const filtered = filter === "Semua" ? data : data.filter((d) => d.status === filter);
  const count = (s) => data.filter((d) => d.status === s).length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: "Hadir", icon: "✅", color: "emerald" },
          { label: "Telat", icon: "⏰", color: "amber" },
          { label: "Izin", icon: "📋", color: "blue" },
          { label: "Sakit", icon: "🏥", color: "purple" },
          { label: "Alpha", icon: "❌", color: "red" },
        ].map((s) => (
          <button key={s.label} onClick={() => setFilter(filter === s.label ? "Semua" : s.label)}
            className={`bg-white rounded-2xl p-4 border text-left transition-all hover:shadow-md ${filter === s.label ? `border-${s.color}-400 ring-2 ring-${s.color}-100` : "border-slate-100"}`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-bold text-slate-800">{count(s.label)}</div>
            <div className="text-xs text-slate-400 font-medium">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800">Absensi Hari Ini</h3>
            <p className="text-slate-400 text-xs">{new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setFilter("Semua")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === "Semua" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              Semua ({data.length})
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {["Karyawan", "Departemen", "Jam Masuk", "Jam Keluar", "Status", "Update"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 ${d.color} rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>{d.avatar}</div>
                      <div>
                        <div className="font-semibold text-slate-800 text-sm">{d.nama}</div>
                        <div className="text-slate-400 text-xs">{d.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-500 text-sm">{d.dept}</td>
                  <td className="px-5 py-4">
                    <span className={`text-sm font-mono font-semibold ${d.masuk === "-" ? "text-slate-300" : "text-slate-700"}`}>{d.masuk}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-sm font-mono font-semibold ${d.keluar === "-" ? "text-slate-300" : "text-slate-700"}`}>{d.keluar}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyle[d.status]}`}>{d.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <select value={d.status} onChange={(e) => updateStatus(d.id, e.target.value)}
                      className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 outline-none focus:border-emerald-400 bg-white text-slate-600">
                      {statusOpts.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
          {filtered.length} karyawan ditampilkan
        </div>
      </div>
    </div>
  );
}
