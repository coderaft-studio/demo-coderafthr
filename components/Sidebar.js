"use client";
import { useState } from "react";

const menus = [
  { icon: "▦", label: "Dashboard", id: "dashboard" },
  { icon: "👤", label: "Karyawan", id: "karyawan" },
  { icon: "📅", label: "Absensi", id: "absensi" },
  { icon: "💰", label: "Penggajian", id: "penggajian" },
  { icon: "🏖", label: "Cuti", id: "cuti" },
  { icon: "⚙️", label: "Pengaturan", id: "pengaturan" },
];

export default function Sidebar({ active, setActive }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`bg-emerald-950 flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-60"} min-h-screen flex-shrink-0`}>
      <div className="h-16 flex items-center px-4 border-b border-emerald-800/50 gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">H</div>
        {!collapsed && <span className="text-white font-bold text-lg">CoderaftHR</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="ml-auto text-emerald-400 hover:text-white transition-colors text-xs">
          {collapsed ? "▶" : "◀"}
        </button>
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2">
        {menus.map((m) => (
          <button key={m.id} onClick={() => setActive(m.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
              active === m.id ? "bg-emerald-600 text-white" : "text-emerald-300 hover:bg-emerald-800/50 hover:text-white"
            }`}>
            <span className="text-base flex-shrink-0">{m.icon}</span>
            {!collapsed && <span className="text-sm font-medium">{m.label}</span>}
          </button>
        ))}
      </nav>

      <div className={`p-4 border-t border-emerald-800/50 flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">HR</div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-white text-sm font-medium truncate">HR Manager</div>
            <div className="text-emerald-400 text-xs truncate">hr@perusahaan.id</div>
          </div>
        )}
      </div>
    </aside>
  );
}
