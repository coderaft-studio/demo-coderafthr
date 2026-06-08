"use client";
import { useState, useMemo } from "react";

const IND="#6366f1", VIO="#8b5cf6", EME="#10b981", AMB="#f59e0b", ROS="#f43f5e", SKY="#0ea5e9";
const SLA="#1e293b", MUT="#64748b", BOR="#e2e8f0", LIG="#f8fafc";

const SCFG = {
  Hadir:  { color:EME, bg:"rgba(16,185,129,0.1)",  brd:"rgba(16,185,129,0.25)",  dot:EME,  icon:"✅" },
  Telat:  { color:AMB, bg:"rgba(245,158,11,0.1)",  brd:"rgba(245,158,11,0.25)",  dot:AMB,  icon:"⏰" },
  Izin:   { color:SKY, bg:"rgba(14,165,233,0.1)",  brd:"rgba(14,165,233,0.25)",  dot:SKY,  icon:"📋" },
  Sakit:  { color:VIO, bg:"rgba(139,92,246,0.1)",  brd:"rgba(139,92,246,0.25)",  dot:VIO,  icon:"🏥" },
  Alpha:  { color:ROS, bg:"rgba(244,63,94,0.1)",   brd:"rgba(244,63,94,0.25)",   dot:ROS,  icon:"❌" },
  Libur:  { color:MUT, bg:"rgba(100,116,139,0.06)", brd:"rgba(100,116,139,0.15)", dot:MUT, icon:"🏖" },
};
const STATUS_OPTS = ["Hadir","Telat","Izin","Sakit","Alpha"];

const EMPLOYEES = [
  { id:"EMP-001", nama:"Rini Handayani",  dept:"Engineering", av:"RH", color:IND  },
  { id:"EMP-002", nama:"Budi Prasetyo",   dept:"Marketing",   av:"BP", color:VIO  },
  { id:"EMP-003", nama:"Sinta Maharani",  dept:"Finance",     av:"SM", color:EME  },
  { id:"EMP-004", nama:"Fajar Nugroho",   dept:"Sales",       av:"FN", color:AMB  },
  { id:"EMP-005", nama:"Dewi Kusuma",     dept:"HR & Admin",  av:"DK", color:ROS  },
  { id:"EMP-006", nama:"Hendra Jaya",     dept:"Engineering", av:"HJ", color:SKY  },
  { id:"EMP-007", nama:"Ahmad Rizky",     dept:"Operasional", av:"AR", color:"#06b6d4" },
  { id:"EMP-008", nama:"Lina Santoso",    dept:"Marketing",   av:"LS", color:"#ec4899" },
];

// June 2026 calendar: Mon=1, working days
// June 1=Mon ... June 30=Tue
// Working days in June 2026: 1-5, 8-12, 15-19, 22-26, 29-30 (22 days)
const WEEKS = [
  { label:"1 - 6 Jun",  days:[{d:1,l:"Sen"},{d:2,l:"Sel"},{d:3,l:"Rab"},{d:4,l:"Kam"},{d:5,l:"Jum"}] },
  { label:"8 - 12 Jun", days:[{d:8,l:"Sen"},{d:9,l:"Sel"},{d:10,l:"Rab"},{d:11,l:"Kam"},{d:12,l:"Jum"}] },
  { label:"15 - 19 Jun",days:[{d:15,l:"Sen"},{d:16,l:"Sel"},{d:17,l:"Rab"},{d:18,l:"Kam"},{d:19,l:"Jum"}] },
  { label:"22 - 26 Jun",days:[{d:22,l:"Sen"},{d:23,l:"Sel"},{d:24,l:"Rab"},{d:25,l:"Kam"},{d:26,l:"Jum"}] },
  { label:"29 - 30 Jun",days:[{d:29,l:"Sen"},{d:30,l:"Sel"}] },
];

const TODAY_DATE = 9; // "today" = June 9, 2026 (Tuesday)
const TODAY_LABEL = "Selasa, 9 Juni 2026";

// Pre-generate attendance data for all employees all working days
const SEED_POOL = {
  "EMP-001": {1:"Hadir",2:"Hadir",3:"Hadir",4:"Hadir",5:"Hadir",8:"Hadir",9:"Hadir",10:"Hadir",11:"Hadir",12:"Hadir",15:"Hadir",16:"Telat",17:"Hadir",18:"Hadir",19:"Hadir",22:"Hadir",23:"Hadir",24:"Hadir",25:"Hadir",26:"Hadir",29:"Hadir",30:"Hadir"},
  "EMP-002": {1:"Hadir",2:"Telat",3:"Hadir",4:"Hadir",5:"Izin",8:"Hadir",9:"Telat",10:"Hadir",11:"Hadir",12:"Hadir",15:"Hadir",16:"Hadir",17:"Hadir",18:"Telat",19:"Hadir",22:"Izin",23:"Hadir",24:"Hadir",25:"Hadir",26:"Hadir",29:"Hadir",30:"Hadir"},
  "EMP-003": {1:"Hadir",2:"Hadir",3:"Hadir",4:"Hadir",5:"Hadir",8:"Hadir",9:"Hadir",10:"Hadir",11:"Hadir",12:"Hadir",15:"Hadir",16:"Hadir",17:"Hadir",18:"Hadir",19:"Hadir",22:"Hadir",23:"Hadir",24:"Hadir",25:"Hadir",26:"Hadir",29:"Hadir",30:"Hadir"},
  "EMP-004": {1:"Hadir",2:"Hadir",3:"Alpha",4:"Hadir",5:"Hadir",8:"Telat",9:"Hadir",10:"Hadir",11:"Izin",12:"Hadir",15:"Hadir",16:"Hadir",17:"Sakit",18:"Sakit",19:"Hadir",22:"Hadir",23:"Telat",24:"Hadir",25:"Hadir",26:"Hadir",29:"Hadir",30:"Hadir"},
  "EMP-005": {1:"Hadir",2:"Hadir",3:"Hadir",4:"Izin",5:"Izin",8:"Hadir",9:"Hadir",10:"Hadir",11:"Hadir",12:"Hadir",15:"Sakit",16:"Sakit",17:"Hadir",18:"Hadir",19:"Hadir",22:"Hadir",23:"Hadir",24:"Hadir",25:"Alpha",26:"Hadir",29:"Hadir",30:"Hadir"},
  "EMP-006": {1:"Hadir",2:"Hadir",3:"Hadir",4:"Hadir",5:"Hadir",8:"Hadir",9:"Hadir",10:"Hadir",11:"Hadir",12:"Telat",15:"Hadir",16:"Hadir",17:"Hadir",18:"Hadir",19:"Hadir",22:"Hadir",23:"Hadir",24:"Hadir",25:"Hadir",26:"Hadir",29:"Hadir",30:"Hadir"},
  "EMP-007": {1:"Hadir",2:"Hadir",3:"Hadir",4:"Hadir",5:"Hadir",8:"Hadir",9:"Hadir",10:"Hadir",11:"Hadir",12:"Hadir",15:"Hadir",16:"Hadir",17:"Hadir",18:"Hadir",19:"Hadir",22:"Hadir",23:"Hadir",24:"Telat",25:"Hadir",26:"Hadir",29:"Hadir",30:"Hadir"},
  "EMP-008": {1:"Hadir",2:"Hadir",3:"Hadir",4:"Hadir",5:"Sakit",8:"Sakit",9:"Hadir",10:"Hadir",11:"Hadir",12:"Hadir",15:"Hadir",16:"Hadir",17:"Hadir",18:"Hadir",19:"Hadir",22:"Hadir",23:"Hadir",24:"Hadir",25:"Hadir",26:"Hadir",29:"Hadir",30:"Hadir"},
};

// Time in/out per employee for today (June 9)
const TODAY_TIMES = {
  "EMP-001": { masuk:"08:02", keluar:"17:05" },
  "EMP-002": { masuk:"09:18", keluar:"18:00" },
  "EMP-003": { masuk:"07:55", keluar:"17:00" },
  "EMP-004": { masuk:"08:30", keluar:"-"     },
  "EMP-005": { masuk:"08:05", keluar:"-"     },
  "EMP-006": { masuk:"08:00", keluar:"17:00" },
  "EMP-007": { masuk:"07:58", keluar:"-"     },
  "EMP-008": { masuk:"08:12", keluar:"17:30" },
};

function getMonthPct(empId, data) {
  const all = Object.keys(SEED_POOL[empId]||{}).map(d=>data[empId]?.[+d]);
  const hadir = all.filter(s=>s==="Hadir"||s==="Telat").length;
  return Math.round((hadir/all.length)*100);
}

export default function AbsensiView() {
  const [data,      setData]      = useState(SEED_POOL);
  const [times,     setTimes]     = useState(TODAY_TIMES);
  const [editRow,   setEditRow]   = useState(null);   // empId sedang diedit
  const [editForm,  setEditForm]  = useState({ masuk:"", keluar:"" });
  const [view,      setView]      = useState("hari");
  const [weekIdx,   setWeekIdx]   = useState(1);
  const [deptF,     setDeptF]     = useState("Semua");

  const startEdit = (emp) => {
    setEditRow(emp.id);
    setEditForm({ masuk:times[emp.id]?.masuk||"", keluar:times[emp.id]?.keluar||"" });
  };
  const saveEdit = (empId) => {
    setTimes(prev=>({ ...prev, [empId]:{ masuk:editForm.masuk||"-", keluar:editForm.keluar||"-" } }));
    setEditRow(null);
  };

  const employees = deptF==="Semua" ? EMPLOYEES : EMPLOYEES.filter(e=>e.dept===deptF);

  const updateStatus = (empId, day, status) => {
    setData(prev=>({ ...prev, [empId]:{ ...(prev[empId]||{}), [day]:status } }));
  };

  // Today summary
  const todayStats = STATUS_OPTS.reduce((acc,s)=>{
    acc[s] = EMPLOYEES.filter(e=>data[e.id]?.[TODAY_DATE]===s).length;
    return acc;
  },{});
  todayStats.total = EMPLOYEES.length;

  // Working hours from time string
  const workHours = (masuk, keluar) => {
    if (masuk==="-"||keluar==="-") return null;
    const [hm, mm] = masuk.split(":").map(Number);
    const [hk, mk] = keluar.split(":").map(Number);
    const diff = (hk*60+mk)-(hm*60+mm);
    return `${Math.floor(diff/60)}j ${diff%60}m`;
  };

  const isLate = (time) => {
    if (!time||time==="-") return false;
    const [h,m] = time.split(":").map(Number);
    return h>8 || (h===8 && m>15);
  };

  const curWeek = WEEKS[weekIdx];

  return (
    <div className="space-y-4">

      {/* ── Header with period info ── */}
      <div style={{ background:`linear-gradient(135deg,${IND},${VIO})`, borderRadius:"16px", padding:"20px 24px", color:"#fff" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
          <div>
            <div style={{ fontSize:"11px", opacity:0.7, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"4px" }}>Data Absensi</div>
            <div style={{ fontWeight:900, fontSize:"20px" }}>
              {view==="hari"  && TODAY_LABEL}
              {view==="minggu"&& `Minggu ${weekIdx+1}: ${curWeek.label} 2026`}
              {view==="bulan" && "Juni 2026 · 22 Hari Kerja"}
            </div>
            <div style={{ fontSize:"12px", opacity:0.7, marginTop:"4px" }}>
              {view==="hari"  && "Menampilkan status absensi seluruh karyawan hari ini"}
              {view==="minggu"&& `Menampilkan 5 hari kerja minggu ini (${curWeek.days.length} hari ditampilkan)`}
              {view==="bulan" && "Rekap lengkap kehadiran semua karyawan bulan Juni 2026"}
            </div>
          </div>
          {/* View selector */}
          <div style={{ display:"flex", gap:"4px", background:"rgba(255,255,255,0.15)", borderRadius:"10px", padding:"4px" }}>
            {[["hari","📅 Hari Ini"],["minggu","📆 Minggu"],["bulan","🗓 Bulan"]].map(([v,l])=>(
              <button key={v} onClick={()=>setView(v)}
                style={{ padding:"7px 14px", borderRadius:"8px", fontSize:"11px", fontWeight:700, cursor:"pointer", border:"none", background:view===v?"#fff":"transparent", color:view===v?IND:"rgba(255,255,255,0.8)", transition:"all 0.2s" }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Summary stats ── */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        <div style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"12px", padding:"14px", gridColumn:"span 1" }}>
          <div style={{ color:SLA, fontWeight:900, fontSize:"24px" }}>{todayStats.total}</div>
          <div style={{ color:MUT, fontSize:"11px", marginTop:"2px" }}>Total</div>
        </div>
        {STATUS_OPTS.map(s=>{
          const cfg=SCFG[s];
          return (
            <div key={s} style={{ background:cfg.bg, border:`1px solid ${cfg.brd}`, borderRadius:"12px", padding:"14px" }}>
              <div style={{ fontSize:"18px", marginBottom:"3px" }}>{cfg.icon}</div>
              <div style={{ color:cfg.color, fontWeight:900, fontSize:"22px" }}>
                {view==="hari"  ? (todayStats[s]||0) :
                 view==="minggu"? EMPLOYEES.reduce((a,e)=>a+(curWeek.days.filter(d=>data[e.id]?.[d.d]===s).length),0) :
                 EMPLOYEES.reduce((a,e)=>a+Object.keys(SEED_POOL[e.id]||{}).filter(d=>data[e.id]?.[+d]===s).length,0)}
              </div>
              <div style={{ color:cfg.color, fontSize:"10px", fontWeight:600, marginTop:"1px", opacity:0.8 }}>{s}</div>
            </div>
          );
        })}
      </div>

      {/* ── Filters ── */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"10px" }}>
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
          {["Semua","Engineering","Marketing","Finance","Sales","HR & Admin","Operasional"].map(d=>(
            <button key={d} onClick={()=>setDeptF(d)}
              style={{ padding:"5px 12px", borderRadius:"20px", fontSize:"11px", fontWeight:600, cursor:"pointer", border:`1px solid ${deptF===d?IND:BOR}`, background:deptF===d?"rgba(99,102,241,0.1)":"#fff", color:deptF===d?IND:MUT }}>
              {d}
            </button>
          ))}
        </div>
        {view==="minggu" && (
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <button onClick={()=>setWeekIdx(Math.max(0,weekIdx-1))} disabled={weekIdx===0}
              style={{ width:"30px", height:"30px", border:`1px solid ${BOR}`, borderRadius:"8px", background:"#fff", cursor:weekIdx===0?"not-allowed":"pointer", color:weekIdx===0?MUT:SLA, fontSize:"14px" }}>←</button>
            <span style={{ color:SLA, fontSize:"12px", fontWeight:700, minWidth:"120px", textAlign:"center" }}>Minggu {weekIdx+1}/5 · {curWeek.label}</span>
            <button onClick={()=>setWeekIdx(Math.min(WEEKS.length-1,weekIdx+1))} disabled={weekIdx===WEEKS.length-1}
              style={{ width:"30px", height:"30px", border:`1px solid ${BOR}`, borderRadius:"8px", background:"#fff", cursor:weekIdx===WEEKS.length-1?"not-allowed":"pointer", color:weekIdx===WEEKS.length-1?MUT:SLA, fontSize:"14px" }}>→</button>
          </div>
        )}
      </div>

      {/* ══════════════════════════════ HARI INI VIEW ══════════════════════════════ */}
      {view==="hari" && (
        <div style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"16px", overflow:"hidden" }}>

          {/* Date header */}
          <div style={{ padding:"14px 20px", borderBottom:`1px solid ${BOR}`, background:LIG, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ color:SLA, fontWeight:700, fontSize:"14px" }}>{TODAY_LABEL}</span>
              <span style={{ background:"rgba(99,102,241,0.1)", color:IND, fontSize:"10px", fontWeight:700, padding:"3px 9px", borderRadius:"20px" }}>● Hari Ini</span>
            </div>
            <button style={{ color:IND, background:"rgba(99,102,241,0.08)", border:`1px solid rgba(99,102,241,0.2)`, borderRadius:"8px", padding:"6px 14px", fontSize:"11px", fontWeight:700, cursor:"pointer" }}>
              ⬇ Export CSV
            </button>
          </div>

          {/* Cards per employee */}
          <div style={{ padding:"12px 16px", display:"flex", flexDirection:"column", gap:"8px" }}>
            {employees.map((emp,i)=>{
              const status    = data[emp.id]?.[TODAY_DATE] || "Hadir";
              const cfg       = SCFG[status];
              const empTime   = times[emp.id] || { masuk:"-", keluar:"-" };
              const late      = isLate(empTime.masuk);
              const hours     = workHours(empTime.masuk, empTime.keluar);
              const isEditing = editRow === emp.id;

              return (
                <div key={emp.id}
                  style={{ border:`1px solid ${isEditing?IND:BOR}`, borderLeft:`4px solid ${cfg.color}`, borderRadius:"12px", padding:"14px 16px", background:isEditing?`rgba(99,102,241,0.02)`:"#fff", transition:"all 0.15s", boxShadow:isEditing?`0 0 0 3px rgba(99,102,241,0.1)`:"none" }}
                  onMouseEnter={e=>{ if(!isEditing){ e.currentTarget.style.borderColor=BOR; e.currentTarget.style.background=LIG; }}}
                  onMouseLeave={e=>{ if(!isEditing){ e.currentTarget.style.borderColor=BOR; e.currentTarget.style.background="#fff"; }}}>

                  <div style={{ display:"flex", alignItems:"center", gap:"16px", flexWrap:"wrap" }}>

                    {/* Avatar + name */}
                    <div style={{ display:"flex", alignItems:"center", gap:"10px", minWidth:"180px", flex:"0 0 180px" }}>
                      <div style={{ width:"40px", height:"40px", borderRadius:"12px", background:`linear-gradient(135deg,${emp.color},${emp.color}99)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"13px", flexShrink:0 }}>{emp.av}</div>
                      <div>
                        <div style={{ color:SLA, fontWeight:700, fontSize:"13px" }}>{emp.nama}</div>
                        <div style={{ color:MUT, fontSize:"10px", marginTop:"1px" }}>{emp.dept}</div>
                      </div>
                    </div>

                    {/* Status badge */}
                    <span style={{ background:cfg.bg, color:cfg.color, fontSize:"11px", fontWeight:700, padding:"5px 12px", borderRadius:"20px", border:`1px solid ${cfg.brd}`, flex:"0 0 auto" }}>
                      {cfg.icon} {status}
                    </span>

                    {/* Time blocks */}
                    {isEditing ? (
                      <div style={{ display:"flex", alignItems:"center", gap:"10px", flex:1 }}>
                        <div>
                          <div style={{ color:MUT, fontSize:"9px", fontWeight:700, textTransform:"uppercase", marginBottom:"4px" }}>Jam Masuk</div>
                          <input type="time" value={editForm.masuk} onChange={e=>setEditForm(p=>({...p,masuk:e.target.value}))}
                            style={{ border:`1px solid ${IND}`, borderRadius:"8px", padding:"7px 10px", fontSize:"13px", color:SLA, outline:"none", boxShadow:`0 0 0 3px rgba(99,102,241,0.12)`, width:"110px" }} />
                        </div>
                        <span style={{ color:MUT, fontSize:"16px", marginTop:"14px" }}>→</span>
                        <div>
                          <div style={{ color:MUT, fontSize:"9px", fontWeight:700, textTransform:"uppercase", marginBottom:"4px" }}>Jam Keluar</div>
                          <input type="time" value={editForm.keluar} onChange={e=>setEditForm(p=>({...p,keluar:e.target.value}))}
                            style={{ border:`1px solid ${IND}`, borderRadius:"8px", padding:"7px 10px", fontSize:"13px", color:SLA, outline:"none", boxShadow:`0 0 0 3px rgba(99,102,241,0.12)`, width:"110px" }} />
                        </div>
                        <div style={{ marginTop:"14px", display:"flex", gap:"6px" }}>
                          <button onClick={()=>saveEdit(emp.id)} style={{ background:EME, border:"none", borderRadius:"8px", color:"#fff", padding:"8px 16px", fontSize:"12px", fontWeight:700, cursor:"pointer" }}>✓ Simpan</button>
                          <button onClick={()=>setEditRow(null)} style={{ background:"none", border:`1px solid ${BOR}`, borderRadius:"8px", color:MUT, padding:"8px 12px", fontSize:"12px", cursor:"pointer" }}>Batal</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Jam Masuk */}
                        <div style={{ flex:"0 0 auto", textAlign:"center" }}>
                          <div style={{ color:MUT, fontSize:"9px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:"3px" }}>Masuk</div>
                          <div style={{ color:late?AMB:empTime.masuk==="-"?"#cbd5e1":EME, fontWeight:900, fontSize:"16px", fontFamily:"monospace" }}>{empTime.masuk}</div>
                          {late && <div style={{ color:AMB, fontSize:"9px", fontWeight:600 }}>Terlambat</div>}
                        </div>

                        <span style={{ color:BOR, fontSize:"18px", flex:"0 0 auto" }}>→</span>

                        {/* Jam Keluar */}
                        <div style={{ flex:"0 0 auto", textAlign:"center" }}>
                          <div style={{ color:MUT, fontSize:"9px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:"3px" }}>Keluar</div>
                          <div style={{ color:empTime.keluar==="-"?"#cbd5e1":SLA, fontWeight:900, fontSize:"16px", fontFamily:"monospace" }}>{empTime.keluar}</div>
                          {empTime.keluar==="-" && <div style={{ color:IND, fontSize:"9px", fontWeight:600 }}>Di kantor</div>}
                        </div>

                        {/* Durasi */}
                        {hours && (
                          <div style={{ background:`rgba(99,102,241,0.07)`, border:`1px solid rgba(99,102,241,0.15)`, borderRadius:"20px", padding:"5px 12px", flex:"0 0 auto" }}>
                            <span style={{ color:IND, fontWeight:700, fontSize:"12px" }}>⏱ {hours}</span>
                          </div>
                        )}

                        {/* Update status */}
                        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"8px", flex:"0 0 auto" }}>
                          <select value={status} onChange={e=>updateStatus(emp.id,TODAY_DATE,e.target.value)}
                            style={{ border:`1px solid ${BOR}`, borderRadius:"8px", padding:"7px 10px", fontSize:"11px", color:SLA, outline:"none", cursor:"pointer", background:"#fff" }}
                            onFocus={e=>e.target.style.borderColor=IND}
                            onBlur={e =>e.target.style.borderColor=BOR}>
                            {STATUS_OPTS.map(s=><option key={s}>{s}</option>)}
                          </select>
                          <button onClick={()=>startEdit(emp)}
                            style={{ color:IND, background:"rgba(99,102,241,0.08)", border:`1px solid rgba(99,102,241,0.2)`, borderRadius:"8px", padding:"7px 12px", fontSize:"11px", fontWeight:600, cursor:"pointer", whiteSpace:"nowrap" }}>
                            ✎ Edit Jam
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div style={{ padding:"12px 20px", borderTop:`1px solid ${BOR}`, background:LIG, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ color:MUT, fontSize:"11px" }}>
              Tingkat kehadiran hari ini: <span style={{ color:EME, fontWeight:700 }}>
                {Math.round(((todayStats.Hadir||0)+(todayStats.Telat||0))/EMPLOYEES.length*100)}%
              </span>
            </span>
            <span style={{ color:MUT, fontSize:"11px" }}>{employees.length} karyawan ditampilkan</span>
          </div>
        </div>
      )}

      {/* ══════════════════════════════ MINGGU INI VIEW ══════════════════════════════ */}
      {view==="minggu" && (
        <div style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"16px", overflow:"hidden" }}>
          {/* Date header */}
          <div style={{ padding:"14px 20px", borderBottom:`1px solid ${BOR}`, background:LIG }}>
            <div style={{ color:SLA, fontWeight:700, fontSize:"14px" }}>
              Minggu ke-{weekIdx+1} · {curWeek.label} 2026
            </div>
            <div style={{ color:MUT, fontSize:"11px", marginTop:"2px" }}>
              {curWeek.days.length} hari kerja · Klik sel untuk update status
            </div>
          </div>

          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", minWidth:"600px" }}>
              <thead>
                <tr style={{ background:LIG }}>
                  <th style={{ textAlign:"left", padding:"12px 16px", color:MUT, fontSize:"11px", fontWeight:700, borderBottom:`1px solid ${BOR}`, minWidth:"180px" }}>Karyawan</th>
                  {curWeek.days.map(d=>{
                    const isToday = d.d===TODAY_DATE;
                    return (
                      <th key={d.d} style={{ padding:"10px 8px", textAlign:"center", borderBottom:`1px solid ${BOR}`, minWidth:"80px", background:isToday?"rgba(99,102,241,0.06)":LIG }}>
                        <div style={{ color:isToday?IND:MUT, fontWeight:isToday?700:600, fontSize:"12px" }}>{d.l}</div>
                        <div style={{ color:isToday?IND:SLA, fontWeight:isToday?900:700, fontSize:"16px", marginTop:"2px" }}>{d.d}</div>
                        <div style={{ color:isToday?IND:MUT, fontSize:"9px", marginTop:"1px" }}>Jun</div>
                        {isToday && <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:IND, margin:"3px auto 0" }}/>}
                      </th>
                    );
                  })}
                  <th style={{ padding:"10px 12px", textAlign:"center", borderBottom:`1px solid ${BOR}`, color:MUT, fontSize:"11px", fontWeight:700 }}>Rekap</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp,ri)=>(
                  <tr key={emp.id} style={{ borderBottom:ri<employees.length-1?`1px solid ${BOR}`:"none" }}>
                    <td style={{ padding:"12px 16px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                        <div style={{ width:"32px", height:"32px", borderRadius:"50%", background:emp.color, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"10px" }}>{emp.av}</div>
                        <div>
                          <div style={{ color:SLA, fontWeight:600, fontSize:"12px" }}>{emp.nama}</div>
                          <div style={{ color:MUT, fontSize:"10px" }}>{emp.dept}</div>
                        </div>
                      </div>
                    </td>
                    {curWeek.days.map(d=>{
                      const st  = data[emp.id]?.[d.d];
                      const cfg = st ? SCFG[st] : { color:MUT, bg:"transparent", dot:BOR };
                      const isToday = d.d===TODAY_DATE;
                      return (
                        <td key={d.d} style={{ padding:"8px", textAlign:"center", background:isToday?"rgba(99,102,241,0.03)":"transparent" }}>
                          {st ? (
                            <div title={`${emp.nama} · ${d.l} ${d.d} Jun · ${st}`}
                              onClick={()=>{ if(isToday){ const idx=STATUS_OPTS.indexOf(st); updateStatus(emp.id,d.d,STATUS_OPTS[(idx+1)%STATUS_OPTS.length]); }}}
                              style={{ width:"36px", height:"36px", borderRadius:"10px", background:cfg.bg, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto", cursor:isToday?"pointer":"default", border:`1px solid ${isToday?cfg.dot:"transparent"}` }}>
                              <span style={{ fontSize:"16px" }}>{cfg.icon}</span>
                            </div>
                          ) : (
                            <div style={{ width:"36px", height:"36px", borderRadius:"10px", background:"rgba(0,0,0,0.03)", margin:"0 auto" }}/>
                          )}
                        </td>
                      );
                    })}
                    {/* Rekap minggu ini */}
                    <td style={{ padding:"8px 12px", textAlign:"center" }}>
                      <div style={{ display:"flex", gap:"3px", justifyContent:"center", flexWrap:"wrap" }}>
                        {STATUS_OPTS.map(s=>{
                          const cnt = curWeek.days.filter(d=>data[emp.id]?.[d.d]===s).length;
                          if (!cnt) return null;
                          return <span key={s} style={{ fontSize:"9px", fontWeight:700, padding:"1px 5px", borderRadius:"4px", background:SCFG[s].bg, color:SCFG[s].color }}>{cnt}{s[0]}</span>;
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div style={{ padding:"12px 20px", borderTop:`1px solid ${BOR}`, background:LIG, display:"flex", gap:"16px", flexWrap:"wrap", alignItems:"center" }}>
            <span style={{ color:MUT, fontSize:"11px", fontWeight:600 }}>Keterangan:</span>
            {STATUS_OPTS.map(s=>(
              <div key={s} style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                <span style={{ fontSize:"14px" }}>{SCFG[s].icon}</span>
                <span style={{ color:MUT, fontSize:"11px" }}>{s}</span>
              </div>
            ))}
            <span style={{ color:IND, fontSize:"10px", marginLeft:"auto" }}>💡 Klik sel "Hari Ini" untuk update status</span>
          </div>
        </div>
      )}

      {/* ══════════════════════════════ BULAN INI VIEW ══════════════════════════════ */}
      {view==="bulan" && (
        <div style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"16px", overflow:"hidden" }}>
          {/* Month header */}
          <div style={{ padding:"14px 20px", borderBottom:`1px solid ${BOR}`, background:LIG, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ color:SLA, fontWeight:700, fontSize:"14px" }}>Rekap Absensi · Juni 2026</div>
              <div style={{ color:MUT, fontSize:"11px", marginTop:"2px" }}>22 hari kerja · {employees.length} karyawan</div>
            </div>
            <button style={{ color:IND, background:"rgba(99,102,241,0.08)", border:`1px solid rgba(99,102,241,0.2)`, borderRadius:"8px", padding:"7px 14px", fontSize:"11px", fontWeight:700, cursor:"pointer" }}>
              ⬇ Export Laporan
            </button>
          </div>

          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", minWidth:"1100px" }}>
              <thead>
                <tr style={{ background:LIG }}>
                  <th style={{ textAlign:"left", padding:"10px 16px", color:MUT, fontSize:"11px", fontWeight:700, borderBottom:`1px solid ${BOR}`, minWidth:"170px", position:"sticky", left:0, background:LIG, zIndex:2 }}>Karyawan</th>
                  {WEEKS.flatMap(w=>w.days).map(d=>{
                    const isToday = d.d===TODAY_DATE;
                    return (
                      <th key={d.d} style={{ padding:"6px 4px", textAlign:"center", borderBottom:`1px solid ${BOR}`, minWidth:"34px", background:isToday?"rgba(99,102,241,0.08)":LIG, position:"relative" }}>
                        <div style={{ color:isToday?IND:MUT, fontWeight:isToday?700:500, fontSize:"10px" }}>{d.d}</div>
                        <div style={{ color:isToday?IND:MUT, fontSize:"8px", opacity:0.7 }}>{d.l[0]}</div>
                        {isToday && <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:"4px", height:"4px", borderRadius:"50%", background:IND }}/>}
                      </th>
                    );
                  })}
                  <th style={{ padding:"10px 12px", textAlign:"center", borderBottom:`1px solid ${BOR}`, color:MUT, fontSize:"11px", fontWeight:700, minWidth:"100px" }}>Rekap Bulan</th>
                </tr>
                {/* Week group labels */}
                <tr style={{ background:"rgba(99,102,241,0.03)" }}>
                  <td style={{ padding:"4px 16px", position:"sticky", left:0, background:"rgba(99,102,241,0.03)", zIndex:2 }}>
                    <span style={{ color:MUT, fontSize:"9px" }}>Minggu ke →</span>
                  </td>
                  {WEEKS.map((w,wi)=>(
                    <td key={wi} colSpan={w.days.length} style={{ textAlign:"center", borderRight:`1px solid ${BOR}` }}>
                      <span style={{ color:IND, fontSize:"9px", fontWeight:700 }}>Minggu {wi+1}</span>
                    </td>
                  ))}
                  <td/>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp,ri)=>{
                  const allDays = WEEKS.flatMap(w=>w.days);
                  const pct = getMonthPct(emp.id, data);
                  return (
                    <tr key={emp.id} style={{ borderBottom:ri<employees.length-1?`1px solid ${BOR}`:"none" }}>
                      <td style={{ padding:"8px 16px", position:"sticky", left:0, background:"#fff", zIndex:1, borderRight:`1px solid ${BOR}` }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                          <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:emp.color, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"9px", flexShrink:0 }}>{emp.av}</div>
                          <div style={{ minWidth:0 }}>
                            <div style={{ color:SLA, fontWeight:600, fontSize:"11px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{emp.nama}</div>
                            <div style={{ color:MUT, fontSize:"9px" }}>{emp.dept}</div>
                          </div>
                        </div>
                      </td>
                      {allDays.map(d=>{
                        const st  = data[emp.id]?.[d.d];
                        const cfg = st ? SCFG[st] : null;
                        const isToday = d.d===TODAY_DATE;
                        return (
                          <td key={d.d} style={{ padding:"3px 2px", textAlign:"center", background:isToday?"rgba(99,102,241,0.03)":"transparent" }}>
                            {st ? (
                              <div title={`${emp.nama} · ${d.l} ${d.d} Jun · ${st}`}
                                style={{ width:"26px", height:"26px", borderRadius:"6px", background:cfg.bg, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto", fontSize:"11px", border:`1px solid ${isToday?cfg.dot:"transparent"}` }}>
                                {cfg.icon}
                              </div>
                            ) : (
                              <div style={{ width:"26px", height:"26px", borderRadius:"6px", background:"rgba(0,0,0,0.03)", margin:"0 auto" }}/>
                            )}
                          </td>
                        );
                      })}
                      {/* Monthly summary */}
                      <td style={{ padding:"8px 12px", textAlign:"center" }}>
                        <div style={{ color:pct>=95?EME:pct>=85?AMB:ROS, fontWeight:700, fontSize:"13px" }}>{pct}%</div>
                        <div style={{ height:"4px", background:"rgba(0,0,0,0.06)", borderRadius:"2px", margin:"4px 0 2px" }}>
                          <div style={{ height:"100%", width:`${pct}%`, background:pct>=95?EME:pct>=85?AMB:ROS, borderRadius:"2px" }}/>
                        </div>
                        <div style={{ display:"flex", gap:"3px", justifyContent:"center" }}>
                          {STATUS_OPTS.filter(s=>s!=="Hadir").map(s=>{
                            const cnt = allDays.filter(d=>data[emp.id]?.[d.d]===s).length;
                            if (!cnt) return null;
                            return <span key={s} style={{ fontSize:"8px", fontWeight:700, color:SCFG[s].color }}>{cnt}{s[0]}</span>;
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div style={{ padding:"12px 20px", borderTop:`1px solid ${BOR}`, background:LIG, display:"flex", gap:"14px", flexWrap:"wrap", alignItems:"center" }}>
            <span style={{ color:MUT, fontSize:"11px", fontWeight:600 }}>Keterangan:</span>
            {STATUS_OPTS.map(s=>(
              <div key={s} style={{ display:"flex", alignItems:"center", gap:"4px" }}>
                <div style={{ width:"18px", height:"18px", borderRadius:"4px", background:SCFG[s].bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px" }}>{SCFG[s].icon}</div>
                <span style={{ color:MUT, fontSize:"10px" }}>{s}</span>
              </div>
            ))}
            <div style={{ display:"flex", alignItems:"center", gap:"4px" }}>
              <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:IND }}/>
              <span style={{ color:IND, fontSize:"10px" }}>Hari Ini (9 Jun)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
