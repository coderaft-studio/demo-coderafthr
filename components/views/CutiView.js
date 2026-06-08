"use client";
import { useState, useMemo } from "react";

const IND="#6366f1", VIO="#8b5cf6", EME="#10b981", AMB="#f59e0b", ROS="#f43f5e", SKY="#0ea5e9";
const SLA="#1e293b", MUT="#64748b", BOR="#e2e8f0", LIG="#f8fafc";

const TIPE_CFG = {
  "Cuti Tahunan":   { color:IND, bg:"rgba(99,102,241,0.1)",  icon:"🌴" },
  "Cuti Sakit":     { color:ROS, bg:"rgba(244,63,94,0.1)",   icon:"🏥" },
  "Cuti Melahirkan":{ color:VIO, bg:"rgba(139,92,246,0.1)",  icon:"👶" },
  "Cuti Duka":      { color:MUT, bg:"rgba(100,116,139,0.1)", icon:"🕊" },
  "Izin Penting":   { color:AMB, bg:"rgba(245,158,11,0.1)",  icon:"📋" },
};
const TIPE_CUTI = Object.keys(TIPE_CFG);

const SCFG = {
  Pending:  { color:AMB, bg:"rgba(245,158,11,0.1)",  brd:"rgba(245,158,11,0.3)",  icon:"⏳" },
  Disetujui:{ color:EME, bg:"rgba(16,185,129,0.1)",  brd:"rgba(16,185,129,0.3)",  icon:"✅" },
  Ditolak:  { color:ROS, bg:"rgba(244,63,94,0.1)",   brd:"rgba(244,63,94,0.3)",   icon:"❌" },
};

const EMPLOYEES = [
  { id:"EMP-001", nama:"Rini Handayani",  av:"RH", dept:"Engineering", color:IND },
  { id:"EMP-002", nama:"Budi Prasetyo",   av:"BP", dept:"Marketing",   color:VIO },
  { id:"EMP-003", nama:"Sinta Maharani",  av:"SM", dept:"Finance",     color:EME },
  { id:"EMP-004", nama:"Fajar Nugroho",   av:"FN", dept:"Sales",       color:AMB },
  { id:"EMP-005", nama:"Dewi Kusuma",     av:"DK", dept:"HR & Admin",  color:ROS },
  { id:"EMP-006", nama:"Hendra Jaya",     av:"HJ", dept:"Engineering", color:SKY },
  { id:"EMP-007", nama:"Ahmad Rizky",     av:"AR", dept:"Operasional", color:"#06b6d4" },
  { id:"EMP-008", nama:"Lina Santoso",    av:"LS", dept:"Marketing",   color:"#ec4899" },
];

// Leave balance per employee: { tahunan: used, sakit: used, ... }
const LEAVE_BALANCE = {
  "EMP-001":{ tahunan:{max:12,used:3}, sakit:{max:12,used:0}, izin:{max:6,used:1} },
  "EMP-002":{ tahunan:{max:12,used:0}, sakit:{max:12,used:2}, izin:{max:6,used:0} },
  "EMP-003":{ tahunan:{max:12,used:1}, sakit:{max:12,used:0}, izin:{max:6,used:1} },
  "EMP-004":{ tahunan:{max:12,used:2}, sakit:{max:12,used:0}, izin:{max:6,used:0} },
  "EMP-005":{ tahunan:{max:12,used:4}, sakit:{max:12,used:1}, izin:{max:6,used:0} },
  "EMP-006":{ tahunan:{max:12,used:3}, sakit:{max:12,used:0}, izin:{max:6,used:2} },
  "EMP-007":{ tahunan:{max:12,used:2}, sakit:{max:12,used:2}, izin:{max:6,used:0} },
  "EMP-008":{ tahunan:{max:12,used:3}, sakit:{max:12,used:0}, izin:{max:6,used:1} },
};

const INIT_LEAVES = [
  { id:"CUT-001", empId:"EMP-001", nama:"Rini Handayani",  av:"RH", color:IND,       tipe:"Cuti Tahunan",    dari:"2026-06-10", sampai:"2026-06-12", hari:3, alasan:"Liburan keluarga",     status:"Disetujui", sisaCuti:9  },
  { id:"CUT-002", empId:"EMP-002", nama:"Budi Prasetyo",   av:"BP", color:VIO,       tipe:"Cuti Sakit",      dari:"2026-06-08", sampai:"2026-06-09", hari:2, alasan:"Demam dan flu",         status:"Pending",   sisaCuti:12 },
  { id:"CUT-003", empId:"EMP-003", nama:"Sinta Maharani",  av:"SM", color:EME,       tipe:"Izin Penting",    dari:"2026-06-15", sampai:"2026-06-15", hari:1, alasan:"Urusan keluarga",       status:"Pending",   sisaCuti:11 },
  { id:"CUT-004", empId:"EMP-004", nama:"Fajar Nugroho",   av:"FN", color:AMB,       tipe:"Cuti Tahunan",    dari:"2026-06-20", sampai:"2026-06-21", hari:2, alasan:"Pernikahan saudara",    status:"Ditolak",   sisaCuti:10 },
  { id:"CUT-005", empId:"EMP-006", nama:"Hendra Jaya",     av:"HJ", color:SKY,       tipe:"Cuti Tahunan",    dari:"2026-06-25", sampai:"2026-06-27", hari:3, alasan:"Mudik",                 status:"Pending",   sisaCuti:8  },
  { id:"CUT-006", empId:"EMP-007", nama:"Ahmad Rizky",     av:"AR", color:"#06b6d4", tipe:"Cuti Sakit",      dari:"2026-06-05", sampai:"2026-06-06", hari:2, alasan:"Rawat inap",            status:"Disetujui", sisaCuti:10 },
  { id:"CUT-007", empId:"EMP-005", nama:"Dewi Kusuma",     av:"DK", color:ROS,       tipe:"Cuti Melahirkan", dari:"2026-07-01", sampai:"2026-09-30",hari:90, alasan:"Melahirkan",            status:"Disetujui", sisaCuti:8  },
  { id:"CUT-008", empId:"EMP-008", nama:"Lina Santoso",    av:"LS", color:"#ec4899", tipe:"Cuti Tahunan",    dari:"2026-06-17", sampai:"2026-06-19", hari:3, alasan:"Family trip",           status:"Pending",   sisaCuti:9  },
];

// Calendar: June 2026, week rows
const JUNE_WEEKS = [
  [1,2,3,4,5],
  [8,9,10,11,12],
  [15,16,17,18,19],
  [22,23,24,25,26],
  [29,30],
];

function fmtDate(str) {
  const d = new Date(str);
  return `${d.getDate()} ${["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agt","Sep","Okt","Nov","Des"][d.getMonth()]}`;
}
function dateInRange(dateNum, dari, sampai) {
  const year=2026, month=5; // June 2026 = month index 5
  const d = new Date(year, month, dateNum);
  return d >= new Date(dari) && d <= new Date(sampai);
}

function Input({ label, ...props }) {
  return (
    <div>
      <label style={{ display:"block", color:MUT, fontSize:"11px", fontWeight:600, marginBottom:"4px", textTransform:"uppercase", letterSpacing:"0.05em" }}>{label}</label>
      <input {...props} style={{ width:"100%", border:`1px solid ${BOR}`, borderRadius:"8px", padding:"9px 12px", fontSize:"13px", color:SLA, outline:"none", boxSizing:"border-box" }}
        onFocus={e=>{ e.target.style.borderColor=IND; e.target.style.boxShadow=`0 0 0 3px rgba(99,102,241,0.1)`; }}
        onBlur={e =>{ e.target.style.borderColor=BOR; e.target.style.boxShadow="none"; }} />
    </div>
  );
}

export default function CutiView() {
  const [list,  setList]  = useState(INIT_LEAVES);
  const [modal, setModal] = useState(null);
  const [form,  setForm]  = useState({ nama:"", tipe:TIPE_CUTI[0], dari:"", sampai:"", alasan:"" });
  const [view,  setView]  = useState("kanban");   // "kanban" | "kalender" | "saldo"
  const [selDay,setSelDay]= useState(null);
  const [filterTipe, setFT] = useState("Semua");

  const counts = useMemo(()=>({
    Semua:     list.length,
    Pending:   list.filter(c=>c.status==="Pending").length,
    Disetujui: list.filter(c=>c.status==="Disetujui").length,
    Ditolak:   list.filter(c=>c.status==="Ditolak").length,
  }),[list]);

  const totalHari      = list.filter(c=>c.status==="Disetujui").reduce((a,c)=>a+c.hari,0);
  const avgSisaCuti    = Math.round(EMPLOYEES.reduce((a,e)=>{
    const b=LEAVE_BALANCE[e.id]; return a+(b?b.tahunan.max-b.tahunan.used:0);
  },0)/EMPLOYEES.length);

  // Tipe distribution
  const tipeDist = TIPE_CUTI.map(t=>({ t, n:list.filter(c=>c.tipe===t&&c.status==="Disetujui").length })).filter(x=>x.n>0);

  const setStatus = (id, status) => setList(p=>p.map(c=>c.id===id?{...c,status}:c));
  const approveAll = () => setList(p=>p.map(c=>c.status==="Pending"?{...c,status:"Disetujui"}:c));

  const submitRequest = (e) => {
    e.preventDefault();
    const d1=new Date(form.dari), d2=new Date(form.sampai);
    const hari=Math.max(1,Math.round((d2-d1)/(1000*60*60*24))+1);
    const emp = EMPLOYEES.find(e=>e.nama===form.nama)||EMPLOYEES[0];
    setList(p=>[...p,{
      id:`CUT-${String(p.length+1).padStart(3,"0")}`,
      empId:emp.id, nama:form.nama, av:emp.av, color:emp.color,
      tipe:form.tipe, dari:form.dari, sampai:form.sampai,
      hari, alasan:form.alasan, status:"Pending", sisaCuti:10,
    }]);
    setModal(null);
    setForm({ nama:"", tipe:TIPE_CUTI[0], dari:"", sampai:"", alasan:"" });
  };

  // Calendar: which employees are on leave on a given June date
  const getLeaveOnDay = (day) =>
    list.filter(c=>c.status==="Disetujui"&&dateInRange(day,c.dari,c.sampai));

  const COLS = ["Pending","Disetujui","Ditolak"];

  return (
    <div className="space-y-4">

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { l:"Total Pengajuan",  v:counts.Semua,     icon:"📋", from:IND,  to:VIO  },
          { l:"Sedang Berjalan",  v:counts.Disetujui, icon:"✅", from:EME,  to:"#059669" },
          { l:"Pending Approval", v:counts.Pending,   icon:"⏳", from:AMB,  to:"#d97706" },
          { l:"Avg. Sisa Cuti",   v:`${avgSisaCuti} hr`,icon:"🌴",from:SKY, to:"#0284c7" },
        ].map(s=>(
          <div key={s.l} style={{ background:`linear-gradient(135deg,${s.from},${s.to})`, borderRadius:"14px", padding:"18px", color:"#fff", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:"-8px", right:"-8px", fontSize:"48px", opacity:0.12 }}>{s.icon}</div>
            <div style={{ fontSize:"22px" }}>{s.icon}</div>
            <div style={{ fontWeight:900, fontSize:"26px", lineHeight:1, marginTop:"4px" }}>{s.v}</div>
            <div style={{ fontSize:"11px", opacity:0.8, marginTop:"3px" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── Analytics row ── */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Jenis cuti distribution */}
        <div style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"14px", padding:"18px" }}>
          <div style={{ color:SLA, fontWeight:700, fontSize:"13px", marginBottom:"14px" }}>Distribusi Jenis Cuti</div>
          {tipeDist.length===0 ? (
            <div style={{ color:MUT, fontSize:"12px", textAlign:"center", padding:"16px 0" }}>Belum ada cuti disetujui</div>
          ) : tipeDist.map(({t,n})=>{
            const cfg = TIPE_CFG[t];
            const pct = Math.round((n/tipeDist.reduce((a,x)=>a+x.n,0))*100);
            return (
              <div key={t} style={{ marginBottom:"10px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                    <span style={{ fontSize:"14px" }}>{cfg.icon}</span>
                    <span style={{ color:SLA, fontSize:"11px" }}>{t}</span>
                  </div>
                  <span style={{ color:cfg.color, fontWeight:700, fontSize:"11px" }}>{n}x · {pct}%</span>
                </div>
                <div style={{ height:"5px", background:LIG, borderRadius:"3px" }}>
                  <div style={{ height:"100%", width:`${pct}%`, background:cfg.color, borderRadius:"3px" }}/>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leave policy */}
        <div style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"14px", padding:"18px" }}>
          <div style={{ color:SLA, fontWeight:700, fontSize:"13px", marginBottom:"14px" }}>Kebijakan Cuti</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
            {[
              { tipe:"Cuti Tahunan",    max:12, color:IND, icon:"🌴" },
              { tipe:"Cuti Sakit",      max:12, color:ROS, icon:"🏥" },
              { tipe:"Cuti Melahirkan", max:90, color:VIO, icon:"👶" },
              { tipe:"Izin Penting",    max:6,  color:AMB, icon:"📋" },
              { tipe:"Cuti Duka",       max:3,  color:MUT, icon:"🕊" },
            ].map(p=>(
              <div key={p.tipe} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"7px 10px", background:LIG, borderRadius:"8px" }}>
                <span style={{ fontSize:"14px" }}>{p.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ color:SLA, fontSize:"11px", fontWeight:600 }}>{p.tipe}</div>
                </div>
                <span style={{ color:p.color, fontWeight:700, fontSize:"12px", background:`${p.color}15`, padding:"2px 8px", borderRadius:"20px" }}>
                  {p.max} hari
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick summary */}
        <div style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"14px", padding:"18px", display:"flex", flexDirection:"column", gap:"10px" }}>
          <div style={{ color:SLA, fontWeight:700, fontSize:"13px" }}>Ringkasan Bulan Ini</div>
          {[
            { l:"Total Hari Cuti Disetujui", v:`${totalHari} hari`,         color:EME },
            { l:"Karyawan Sedang Cuti",      v:`${getLeaveOnDay(9).length} orang`, color:IND },
            { l:"Pengajuan Pending",          v:`${counts.Pending} request`, color:AMB },
            { l:"Tingkat Approval",           v:counts.Semua>0?`${Math.round((counts.Disetujui/counts.Semua)*100)}%`:"—", color:EME },
          ].map(s=>(
            <div key={s.l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 12px", background:LIG, borderRadius:"8px" }}>
              <span style={{ color:MUT, fontSize:"11px" }}>{s.l}</span>
              <span style={{ color:s.color, fontWeight:700, fontSize:"13px" }}>{s.v}</span>
            </div>
          ))}
          {counts.Pending > 0 && (
            <button onClick={approveAll}
              style={{ width:"100%", padding:"9px", background:`linear-gradient(135deg,${EME},#059669)`, border:"none", borderRadius:"8px", color:"#fff", fontWeight:700, fontSize:"11px", cursor:"pointer" }}>
              ✅ Setujui Semua Pending ({counts.Pending})
            </button>
          )}
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"10px" }}>
        <div style={{ display:"flex", gap:"4px", background:"#fff", border:`1px solid ${BOR}`, borderRadius:"10px", padding:"4px" }}>
          {[["kanban","🗂 Kanban"],["kalender","📅 Kalender"],["saldo","💳 Saldo Cuti"]].map(([v,l])=>(
            <button key={v} onClick={()=>setView(v)}
              style={{ padding:"7px 14px", borderRadius:"7px", fontSize:"11px", fontWeight:700, cursor:"pointer", border:"none", background:view===v?`rgba(99,102,241,0.1)`:"transparent", color:view===v?IND:MUT, transition:"all 0.15s" }}>
              {l}
            </button>
          ))}
        </div>
        <button onClick={()=>setModal("add")}
          style={{ background:`linear-gradient(135deg,${IND},${VIO})`, color:"#fff", border:"none", borderRadius:"8px", padding:"9px 18px", fontSize:"12px", fontWeight:700, cursor:"pointer", boxShadow:"0 4px 12px rgba(99,102,241,0.3)" }}>
          + Ajukan Cuti
        </button>
      </div>

      {/* ══ KANBAN VIEW ══ */}
      {view==="kanban" && (
        <div className="grid lg:grid-cols-3 gap-4">
          {COLS.map(col=>{
            const items = list.filter(c=>c.status===col);
            const cfg = SCFG[col];
            return (
              <div key={col} style={{ background:LIG, border:`1px solid ${BOR}`, borderRadius:"14px", overflow:"hidden" }}>
                <div style={{ padding:"13px 16px", background:"#fff", borderBottom:`1px solid ${BOR}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                    <span style={{ fontSize:"14px" }}>{cfg.icon}</span>
                    <span style={{ color:SLA, fontWeight:700, fontSize:"13px" }}>{col}</span>
                  </div>
                  <span style={{ background:cfg.bg, color:cfg.color, fontSize:"11px", fontWeight:700, padding:"2px 9px", borderRadius:"20px", border:`1px solid ${cfg.brd}` }}>{items.length}</span>
                </div>
                <div style={{ padding:"10px", display:"flex", flexDirection:"column", gap:"8px", minHeight:"180px" }}>
                  {items.length===0 ? (
                    <div style={{ textAlign:"center", padding:"28px 0", color:MUT, fontSize:"11px", opacity:0.5 }}>Tidak ada</div>
                  ) : items.map(c=>{
                    const tc = TIPE_CFG[c.tipe];
                    return (
                      <div key={c.id} style={{ background:"#fff", border:`1px solid ${BOR}`, borderLeft:`3px solid ${cfg.color}`, borderRadius:"10px", padding:"12px 14px", boxShadow:"0 1px 4px rgba(0,0,0,0.04)", transition:"box-shadow 0.2s" }}
                        onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.08)"}
                        onMouseLeave={e=>e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.04)"}>

                        {/* Header */}
                        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"9px" }}>
                          <div style={{ width:"30px", height:"30px", borderRadius:"50%", background:c.color, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"10px", flexShrink:0 }}>{c.av}</div>
                          <div style={{ flex:1 }}>
                            <div style={{ color:SLA, fontWeight:600, fontSize:"12px" }}>{c.nama}</div>
                            <div style={{ color:MUT, fontSize:"9px" }}>{c.id}</div>
                          </div>
                          <span style={{ background:tc.bg, color:tc.color, fontSize:"9px", fontWeight:700, padding:"2px 6px", borderRadius:"4px" }}>{tc.icon} {c.tipe}</span>
                        </div>

                        {/* Info */}
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5px", marginBottom:"9px" }}>
                          <div style={{ background:LIG, borderRadius:"6px", padding:"6px 8px" }}>
                            <div style={{ color:MUT, fontSize:"8px", textTransform:"uppercase" }}>Mulai</div>
                            <div style={{ color:SLA, fontWeight:600, fontSize:"11px" }}>{fmtDate(c.dari)}</div>
                          </div>
                          <div style={{ background:LIG, borderRadius:"6px", padding:"6px 8px" }}>
                            <div style={{ color:MUT, fontSize:"8px", textTransform:"uppercase" }}>Selesai</div>
                            <div style={{ color:SLA, fontWeight:600, fontSize:"11px" }}>{fmtDate(c.sampai)}</div>
                          </div>
                        </div>

                        {/* Duration + reason */}
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:col==="Pending"?"8px":"0" }}>
                          <span style={{ background:`rgba(99,102,241,0.08)`, color:IND, fontSize:"10px", fontWeight:700, padding:"3px 8px", borderRadius:"20px" }}>⏱ {c.hari} hari</span>
                          <span style={{ color:MUT, fontSize:"10px", maxWidth:"100px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.alasan}</span>
                        </div>

                        {/* Actions */}
                        {col==="Pending" && (
                          <div style={{ display:"flex", gap:"5px", marginTop:"8px" }}>
                            <button onClick={()=>setStatus(c.id,"Ditolak")}
                              style={{ flex:1, padding:"6px", border:`1px solid ${ROS}`, borderRadius:"7px", color:ROS, background:"rgba(244,63,94,0.05)", fontSize:"10px", fontWeight:600, cursor:"pointer" }}>
                              ✕ Tolak
                            </button>
                            <button onClick={()=>setStatus(c.id,"Disetujui")}
                              style={{ flex:1, padding:"6px", border:"none", borderRadius:"7px", background:`linear-gradient(135deg,${EME},#059669)`, color:"#fff", fontSize:"10px", fontWeight:700, cursor:"pointer" }}>
                              ✓ Setujui
                            </button>
                          </div>
                        )}
                        {col==="Ditolak" && (
                          <button onClick={()=>setStatus(c.id,"Pending")}
                            style={{ width:"100%", padding:"6px", border:`1px solid ${BOR}`, borderRadius:"7px", color:MUT, background:"none", fontSize:"10px", cursor:"pointer", marginTop:"8px" }}>
                            ↺ Kembalikan ke Pending
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
                {/* Footer total hari */}
                {items.length > 0 && (
                  <div style={{ padding:"9px 16px", borderTop:`1px solid ${BOR}`, background:"#fff" }}>
                    <span style={{ color:MUT, fontSize:"10px" }}>
                      Total: <span style={{ color:cfg.color, fontWeight:700 }}>{items.reduce((a,c)=>a+c.hari,0)} hari</span>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ══ KALENDER VIEW ══ */}
      {view==="kalender" && (
        <div style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"14px", overflow:"hidden" }}>
          <div style={{ padding:"14px 20px", borderBottom:`1px solid ${BOR}`, background:LIG, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ color:SLA, fontWeight:700, fontSize:"14px" }}>Kalender Cuti · Juni 2026</div>
              <div style={{ color:MUT, fontSize:"11px", marginTop:"2px" }}>Tampilan cuti yang sudah disetujui</div>
            </div>
            {selDay && (
              <div style={{ background:`rgba(99,102,241,0.08)`, border:`1px solid rgba(99,102,241,0.2)`, borderRadius:"8px", padding:"6px 12px" }}>
                <div style={{ color:IND, fontSize:"11px", fontWeight:700 }}>{selDay} Juni 2026</div>
                <div style={{ color:MUT, fontSize:"10px" }}>{getLeaveOnDay(selDay).length} karyawan cuti</div>
              </div>
            )}
          </div>

          {/* Day headers */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", padding:"10px 16px 6px", gap:"4px" }}>
            {["Senin","Selasa","Rabu","Kamis","Jumat"].map(d=>(
              <div key={d} style={{ textAlign:"center", color:MUT, fontSize:"11px", fontWeight:600 }}>{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div style={{ padding:"0 16px 16px" }}>
            {JUNE_WEEKS.map((week,wi)=>(
              <div key={wi} style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"4px", marginBottom:"4px" }}>
                {week.map(day=>{
                  const onLeave = getLeaveOnDay(day);
                  const isToday = day===9;
                  const isSel   = selDay===day;
                  return (
                    <div key={day} onClick={()=>setSelDay(isSel?null:day)}
                      style={{ borderRadius:"10px", padding:"8px 6px", minHeight:"70px", border:`1px solid ${isSel?IND:isToday?"rgba(99,102,241,0.3)":BOR}`, background:isSel?"rgba(99,102,241,0.04)":isToday?"rgba(99,102,241,0.02)":"#fff", cursor:"pointer", transition:"all 0.15s", boxShadow:isSel?"0 0 0 2px rgba(99,102,241,0.15)":"none" }}
                      onMouseEnter={e=>{ if(!isSel) e.currentTarget.style.background=LIG; }}
                      onMouseLeave={e=>{ if(!isSel) e.currentTarget.style.background=isToday?"rgba(99,102,241,0.02)":"#fff"; }}>
                      <div style={{ color:isToday?IND:SLA, fontWeight:isToday?700:500, fontSize:"13px", marginBottom:"5px" }}>
                        {day}
                        {isToday && <span style={{ marginLeft:"4px", width:"5px", height:"5px", borderRadius:"50%", background:IND, display:"inline-block", verticalAlign:"middle" }}/>}
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
                        {onLeave.slice(0,3).map(c=>(
                          <div key={c.id} style={{ background:TIPE_CFG[c.tipe]?.bg||LIG, borderRadius:"4px", padding:"2px 5px", display:"flex", alignItems:"center", gap:"3px" }}>
                            <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:c.color, flexShrink:0 }}/>
                            <span style={{ color:c.color, fontSize:"9px", fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.av}</span>
                          </div>
                        ))}
                        {onLeave.length>3 && <span style={{ color:MUT, fontSize:"9px" }}>+{onLeave.length-3} lagi</span>}
                      </div>
                    </div>
                  );
                })}
                {/* Fill empty slots for last week */}
                {week.length<5 && Array.from({length:5-week.length}).map((_,i)=>(
                  <div key={`empty-${i}`} style={{ borderRadius:"10px", minHeight:"70px", background:"rgba(0,0,0,0.01)", border:`1px solid ${BOR}` }}/>
                ))}
              </div>
            ))}
          </div>

          {/* Selected day detail */}
          {selDay && getLeaveOnDay(selDay).length>0 && (
            <div style={{ padding:"14px 20px", borderTop:`1px solid ${BOR}`, background:LIG }}>
              <div style={{ color:SLA, fontWeight:700, fontSize:"12px", marginBottom:"10px" }}>Karyawan cuti pada {selDay} Juni 2026:</div>
              <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                {getLeaveOnDay(selDay).map(c=>(
                  <div key={c.id} style={{ display:"flex", alignItems:"center", gap:"7px", background:"#fff", border:`1px solid ${BOR}`, borderRadius:"8px", padding:"7px 12px" }}>
                    <div style={{ width:"26px", height:"26px", borderRadius:"50%", background:c.color, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"9px" }}>{c.av}</div>
                    <div>
                      <div style={{ color:SLA, fontSize:"11px", fontWeight:600 }}>{c.nama}</div>
                      <div style={{ color:TIPE_CFG[c.tipe]?.color||MUT, fontSize:"9px" }}>{c.tipe}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══ SALDO CUTI VIEW ══ */}
      {view==="saldo" && (
        <div style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"14px", overflow:"hidden" }}>
          <div style={{ padding:"14px 20px", borderBottom:`1px solid ${BOR}`, background:LIG, display:"flex", justifyContent:"space-between" }}>
            <div style={{ color:SLA, fontWeight:700, fontSize:"14px" }}>Saldo Cuti Karyawan</div>
            <div style={{ color:MUT, fontSize:"11px" }}>Periode 2026</div>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", minWidth:"700px" }}>
              <thead>
                <tr style={{ background:LIG }}>
                  {["Karyawan","Cuti Tahunan","Cuti Sakit","Izin Penting","Total Sisa","Status"].map(h=>(
                    <th key={h} style={{ textAlign:"left", padding:"11px 16px", color:MUT, fontSize:"10px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", borderBottom:`1px solid ${BOR}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EMPLOYEES.map((emp,i)=>{
                  const b = LEAVE_BALANCE[emp.id]||{};
                  const tahunan = b.tahunan||{max:12,used:0};
                  const sakit   = b.sakit  ||{max:12,used:0};
                  const izin    = b.izin   ||{max:6, used:0};
                  const totalSisa = (tahunan.max-tahunan.used)+(sakit.max-sakit.used)+(izin.max-izin.used);
                  const totalMax  = tahunan.max+sakit.max+izin.max;
                  const pct = Math.round((totalSisa/totalMax)*100);
                  const statusColor = pct>60?EME:pct>30?AMB:ROS;
                  const statusLabel = pct>60?"Cukup":pct>30?"Hampir Habis":"Kritis";

                  const BalanceCell = ({cfg})=>(
                    <td style={{ padding:"12px 16px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                        <div style={{ flex:1, maxWidth:"80px" }}>
                          <div style={{ height:"4px", background:LIG, borderRadius:"2px", marginBottom:"3px" }}>
                            <div style={{ height:"100%", width:`${((cfg.max-cfg.used)/cfg.max)*100}%`, background:cfg.max-cfg.used<=2?ROS:cfg.max-cfg.used<=4?AMB:IND, borderRadius:"2px" }}/>
                          </div>
                        </div>
                        <span style={{ color:SLA, fontWeight:600, fontSize:"12px", whiteSpace:"nowrap" }}>
                          {cfg.max-cfg.used}<span style={{ color:MUT, fontWeight:400 }}>/{cfg.max}</span>
                        </span>
                      </div>
                    </td>
                  );

                  return (
                    <tr key={emp.id} style={{ borderBottom:i<EMPLOYEES.length-1?`1px solid ${BOR}`:"none" }}
                      onMouseEnter={e=>e.currentTarget.style.background=LIG}
                      onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                      <td style={{ padding:"12px 16px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
                          <div style={{ width:"34px", height:"34px", borderRadius:"50%", background:emp.color, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"11px" }}>{emp.av}</div>
                          <div>
                            <div style={{ color:SLA, fontWeight:600, fontSize:"12px" }}>{emp.nama}</div>
                            <div style={{ color:MUT, fontSize:"10px" }}>{emp.dept}</div>
                          </div>
                        </div>
                      </td>
                      <BalanceCell cfg={tahunan}/>
                      <BalanceCell cfg={sakit}/>
                      <BalanceCell cfg={izin}/>
                      <td style={{ padding:"12px 16px" }}>
                        <div style={{ color:SLA, fontWeight:700, fontSize:"13px" }}>{totalSisa} hr</div>
                        <div style={{ height:"3px", background:LIG, borderRadius:"2px", marginTop:"4px", width:"60px" }}>
                          <div style={{ height:"100%", width:`${pct}%`, background:statusColor, borderRadius:"2px" }}/>
                        </div>
                      </td>
                      <td style={{ padding:"12px 16px" }}>
                        <span style={{ background:`${statusColor}18`, color:statusColor, fontSize:"10px", fontWeight:700, padding:"3px 9px", borderRadius:"20px" }}>{statusLabel}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Add Modal ── */}
      {modal==="add" && (
        <div style={{ position:"fixed", inset:0, background:"rgba(15,23,42,0.45)", zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}
          onClick={e=>{if(e.target===e.currentTarget)setModal(null);}}>
          <div style={{ background:"#fff", borderRadius:"20px", padding:"28px", width:"100%", maxWidth:"460px", boxShadow:"0 24px 64px rgba(0,0,0,0.15)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
              <h3 style={{ color:SLA, fontWeight:700, fontSize:"16px", margin:0 }}>Ajukan Cuti</h3>
              <button onClick={()=>setModal(null)} style={{ background:"none", border:"none", cursor:"pointer", color:MUT, fontSize:"18px" }}>✕</button>
            </div>
            <div style={{ height:"3px", background:`linear-gradient(to right,${IND},${VIO})`, borderRadius:"2px", margin:"14px 0 22px" }}/>
            <form onSubmit={submitRequest} className="space-y-4">
              <div>
                <label style={{ display:"block", color:MUT, fontSize:"11px", fontWeight:600, marginBottom:"4px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Karyawan</label>
                <select value={form.nama} onChange={e=>setForm(p=>({...p,nama:e.target.value}))} required
                  style={{ width:"100%", border:`1px solid ${BOR}`, borderRadius:"8px", padding:"9px 12px", fontSize:"13px", color:SLA, outline:"none" }}>
                  <option value="">Pilih karyawan...</option>
                  {EMPLOYEES.map(e=><option key={e.id}>{e.nama}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display:"block", color:MUT, fontSize:"11px", fontWeight:600, marginBottom:"4px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Jenis Cuti</label>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"6px" }}>
                  {TIPE_CUTI.map(t=>{
                    const cfg=TIPE_CFG[t];
                    return (
                      <button key={t} type="button" onClick={()=>setForm(p=>({...p,tipe:t}))}
                        style={{ padding:"8px 6px", borderRadius:"8px", border:`1px solid ${form.tipe===t?cfg.color:BOR}`, background:form.tipe===t?cfg.bg:"#fff", cursor:"pointer", fontSize:"10px", fontWeight:600, color:form.tipe===t?cfg.color:MUT, textAlign:"center" }}>
                        {cfg.icon}<br/>{t.replace("Cuti ","").replace("Izin ","Izin")}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Tanggal Mulai" required type="date" value={form.dari} onChange={e=>setForm(p=>({...p,dari:e.target.value}))} />
                <Input label="Tanggal Selesai" required type="date" value={form.sampai} onChange={e=>setForm(p=>({...p,sampai:e.target.value}))} />
              </div>
              <Input label="Alasan" required placeholder="Keterangan cuti..." value={form.alasan} onChange={e=>setForm(p=>({...p,alasan:e.target.value}))} />
              {form.dari && form.sampai && (
                <div style={{ background:`rgba(99,102,241,0.06)`, border:`1px solid rgba(99,102,241,0.15)`, borderRadius:"8px", padding:"9px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ color:MUT, fontSize:"12px" }}>Estimasi durasi</span>
                  <span style={{ color:IND, fontWeight:700, fontSize:"14px" }}>
                    {Math.max(1,Math.round((new Date(form.sampai)-new Date(form.dari))/(1000*60*60*24))+1)} hari
                  </span>
                </div>
              )}
              <div style={{ display:"flex", gap:"10px", paddingTop:"4px" }}>
                <button type="button" onClick={()=>setModal(null)} style={{ flex:1, padding:"11px", border:`1px solid ${BOR}`, borderRadius:"8px", color:MUT, fontWeight:600, fontSize:"13px", cursor:"pointer", background:"none" }}>Batal</button>
                <button type="submit" style={{ flex:1, padding:"11px", background:`linear-gradient(135deg,${IND},${VIO})`, border:"none", borderRadius:"8px", color:"#fff", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>Ajukan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
