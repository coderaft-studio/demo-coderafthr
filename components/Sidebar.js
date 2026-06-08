"use client";
import { useState } from "react";

const IND  = "#6366f1";
const MUT  = "#64748b";
const SLA  = "#1e293b";
const BOR  = "#e2e8f0";

const menus = [
  { icon:"⊞",  label:"Dashboard",  id:"dashboard"  },
  { icon:"👤",  label:"Karyawan",   id:"karyawan"   },
  { icon:"📅",  label:"Absensi",    id:"absensi"    },
  { icon:"💰",  label:"Penggajian", id:"penggajian" },
  { icon:"🌴",  label:"Cuti",       id:"cuti"       },
  { icon:"⚙",   label:"Pengaturan", id:"pengaturan" },
];

export default function Sidebar({ active, setActive }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className="flex flex-col flex-shrink-0 transition-all duration-300"
      style={{ width:collapsed?"64px":"220px", minHeight:"100vh", background:"#ffffff", borderRight:`1px solid ${BOR}`, position:"relative", zIndex:10 }}>

      {/* Logo */}
      <div className="h-16 flex items-center px-4 gap-3 flex-shrink-0" style={{ borderBottom:`1px solid ${BOR}` }}>
        <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center font-black text-sm text-white"
          style={{ background:`linear-gradient(135deg,${IND},#8b5cf6)`, borderRadius:"10px", boxShadow:"0 4px 12px rgba(99,102,241,0.35)" }}>
          HR
        </div>
        {!collapsed && (
          <div>
            <div className="font-black text-sm" style={{ color:SLA }}>CoderaftHR</div>
            <div className="text-xs" style={{ color:MUT }}>v2.0</div>
          </div>
        )}
        {/* Floating toggle */}
        <button onClick={()=>setCollapsed(!collapsed)}
          style={{ position:"absolute", right:"-11px", top:"22px", width:"22px", height:"22px", borderRadius:"50%", background:"#fff", border:`1px solid ${BOR}`, color:MUT, cursor:"pointer", zIndex:20, fontSize:"8px", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.1)" }}
          onMouseEnter={e=>{ e.currentTarget.style.borderColor=IND; e.currentTarget.style.color=IND; }}
          onMouseLeave={e=>{ e.currentTarget.style.borderColor=BOR; e.currentTarget.style.color=MUT; }}>
          {collapsed?"▶":"◀"}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {menus.map(m=>{
          const isActive = active===m.id;
          return (
            <button key={m.id} onClick={()=>setActive(m.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all"
              style={{ background:isActive?`rgba(99,102,241,0.08)`:"transparent", color:isActive?IND:MUT, borderRadius:"8px", border:"none", cursor:"pointer", borderLeft:isActive?`3px solid ${IND}`:"3px solid transparent" }}
              onMouseEnter={e=>{ if(!isActive){ e.currentTarget.style.background="rgba(99,102,241,0.05)"; e.currentTarget.style.color=SLA; }}}
              onMouseLeave={e=>{ if(!isActive){ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=MUT; }}}>
              <span style={{ width:"20px", textAlign:"center", flexShrink:0, fontSize:"15px" }}>{m.icon}</span>
              {!collapsed && <span className="text-xs font-semibold">{m.label}</span>}
              {!collapsed && isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background:IND }}/>}
            </button>
          );
        })}
      </nav>

      <div style={{ height:"1px", background:BOR, margin:"0 16px" }}/>
      <div className="p-4 flex items-center gap-3" style={{ justifyContent:collapsed?"center":"flex-start" }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
          style={{ background:`linear-gradient(135deg,${IND},#8b5cf6)` }}>HR</div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-xs font-semibold truncate" style={{ color:SLA }}>HR Manager</div>
            <div className="text-xs truncate" style={{ color:MUT }}>hr@perusahaan.id</div>
          </div>
        )}
      </div>
    </aside>
  );
}
