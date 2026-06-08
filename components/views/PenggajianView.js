"use client";
import { useState, useMemo } from "react";

const IND="#6366f1", VIO="#8b5cf6", EME="#10b981", AMB="#f59e0b", ROS="#f43f5e", SKY="#0ea5e9";
const SLA="#1e293b", MUT="#64748b", BOR="#e2e8f0", LIG="#f8fafc";

const DEPT_COLOR = { Engineering:IND, Marketing:VIO, Finance:EME, Sales:AMB, "HR & Admin":ROS, Operasional:SKY };

const MONTHS = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agt","Sep","Okt","Nov","Des"];

const INIT = [
  { id:"EMP-001", nama:"Rini Handayani",  jabatan:"Frontend Developer",  dept:"Engineering", gaji:12000000, tunjangan:1500000, potongan:500000,  av:"RH", color:IND,   status:"Belum"   },
  { id:"EMP-002", nama:"Budi Prasetyo",   jabatan:"Digital Marketer",    dept:"Marketing",   gaji:9000000,  tunjangan:1000000, potongan:400000,  av:"BP", color:VIO,   status:"Dibayar" },
  { id:"EMP-003", nama:"Sinta Maharani",  jabatan:"Financial Analyst",   dept:"Finance",     gaji:11000000, tunjangan:1200000, potongan:450000,  av:"SM", color:EME,   status:"Dibayar" },
  { id:"EMP-004", nama:"Fajar Nugroho",   jabatan:"Sales Executive",     dept:"Sales",       gaji:8500000,  tunjangan:800000,  potongan:350000,  av:"FN", color:AMB,   status:"Belum"   },
  { id:"EMP-005", nama:"Dewi Kusuma",     jabatan:"HR Generalist",       dept:"HR & Admin",  gaji:8000000,  tunjangan:750000,  potongan:300000,  av:"DK", color:ROS,   status:"Proses"  },
  { id:"EMP-006", nama:"Hendra Jaya",     jabatan:"Backend Developer",   dept:"Engineering", gaji:14000000, tunjangan:1800000, potongan:600000,  av:"HJ", color:SKY,   status:"Dibayar" },
  { id:"EMP-007", nama:"Ahmad Rizky",     jabatan:"Operations Manager",  dept:"Operasional", gaji:13000000, tunjangan:1600000, potongan:550000,  av:"AR", color:"#06b6d4", status:"Belum" },
  { id:"EMP-008", nama:"Lina Santoso",    jabatan:"Brand Strategist",    dept:"Marketing",   gaji:10500000, tunjangan:1100000, potongan:420000,  av:"LS", color:"#ec4899", status:"Dibayar" },
];

const SCFG = {
  Dibayar:{ bg:"rgba(16,185,129,0.1)",  color:EME, brd:"rgba(16,185,129,0.25)", icon:"✅" },
  Proses: { bg:"rgba(99,102,241,0.1)",  color:IND, brd:"rgba(99,102,241,0.25)", icon:"⏳" },
  Belum:  { bg:"rgba(245,158,11,0.1)",  color:AMB, brd:"rgba(245,158,11,0.25)", icon:"⏰" },
};

// Salary history per employee (last 6 months take-home)
const HISTORY = {
  "EMP-001":[11200000,11800000,12000000,12500000,13000000,13000000],
  "EMP-002":[8800000,9100000,9200000,9300000,9600000,9600000],
  "EMP-003":[10900000,11200000,11500000,11750000,11750000,11750000],
  "EMP-004":[8450000,8500000,8700000,8700000,8950000,8950000],
  "EMP-005":[8100000,8200000,8200000,8450000,8450000,8450000],
  "EMP-006":[13800000,14200000,14800000,15000000,15200000,15200000],
  "EMP-007":[13200000,13500000,13800000,14050000,14050000,14050000],
  "EMP-008":[10400000,10800000,10900000,11100000,11180000,11180000],
};

function fmt(n) { return "Rp "+(n/1000000).toFixed(1)+"jt"; }
function fmtFull(n) { return "Rp "+n.toLocaleString("id-ID"); }

/* ── Mini sparkline ── */
function Spark({ data, color }) {
  const W=60, H=24, max=Math.max(...data), min=Math.min(...data), rng=max-min||1;
  const xs=data.map((_,i)=>(i/(data.length-1))*W);
  const ys=data.map(p=>H-((p-min)/rng)*(H-4)-2);
  const d=xs.map((x,i)=>`${i===0?"M":"L"} ${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(" ");
  return (
    <svg width={W} height={H} style={{ display:"block" }}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={xs[xs.length-1].toFixed(1)} cy={ys[ys.length-1].toFixed(1)} r="2.5" fill={color}/>
    </svg>
  );
}

/* ── Payslip Modal ── */
function PayslipModal({ emp, month, onClose }) {
  const takeHome = emp.gaji + emp.tunjangan - emp.potongan;
  const bpjsKes  = Math.round(emp.gaji * 0.01);
  const bpjsTk   = Math.round(emp.gaji * 0.02);
  const pph21    = Math.round(emp.gaji * 0.015);
  const col = DEPT_COLOR[emp.dept] || IND;

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(15,23,42,0.5)", zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}
      onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{ background:"#fff", borderRadius:"20px", width:"100%", maxWidth:"440px", overflow:"hidden", boxShadow:"0 24px 64px rgba(0,0,0,0.15)" }}>

        {/* Slip header */}
        <div style={{ background:`linear-gradient(135deg,${col},${col}99)`, padding:"24px", color:"#fff", textAlign:"center" }}>
          <div style={{ fontSize:"10px", opacity:0.7, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"4px" }}>Slip Gaji</div>
          <div style={{ fontWeight:900, fontSize:"16px" }}>CoderaftHR</div>
          <div style={{ opacity:0.7, fontSize:"11px", marginTop:"1px" }}>{month} 2026</div>
          <div style={{ margin:"16px auto 0", width:"52px", height:"52px", borderRadius:"50%", background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:"16px" }}>{emp.av}</div>
          <div style={{ marginTop:"8px", fontWeight:700, fontSize:"15px" }}>{emp.nama}</div>
          <div style={{ opacity:0.75, fontSize:"11px" }}>{emp.jabatan} · {emp.dept}</div>
        </div>

        {/* Breakdown */}
        <div style={{ padding:"20px 24px" }}>
          <div style={{ color:MUT, fontSize:"10px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"12px" }}>Rincian Gaji</div>
          {[
            { l:"Gaji Pokok",  v:emp.gaji,      type:"+" },
            { l:"Tunjangan",   v:emp.tunjangan,  type:"+" },
            { l:"BPJS Kesehatan",v:bpjsKes,     type:"-" },
            { l:"BPJS TK",     v:bpjsTk,         type:"-" },
            { l:"PPh 21",      v:pph21,           type:"-" },
            { l:"Potongan Lain",v:emp.potongan-bpjsKes-bpjsTk-pph21, type:"-" },
          ].filter(r=>r.v>0).map(r=>(
            <div key={r.l} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:`1px solid ${BOR}` }}>
              <span style={{ color:MUT, fontSize:"12px" }}>{r.l}</span>
              <span style={{ color:r.type==="+"?EME:ROS, fontWeight:600, fontSize:"12px" }}>{r.type}{fmtFull(r.v)}</span>
            </div>
          ))}
          {/* Take home */}
          <div style={{ display:"flex", justifyContent:"space-between", padding:"14px 0 0", marginTop:"4px" }}>
            <span style={{ color:SLA, fontWeight:700, fontSize:"15px" }}>Total Take Home</span>
            <span style={{ color:col, fontWeight:900, fontSize:"20px" }}>{fmtFull(takeHome)}</span>
          </div>
          {/* Trend */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"12px", padding:"10px 12px", background:`${col}0d`, borderRadius:"8px" }}>
            <div>
              <div style={{ color:MUT, fontSize:"10px" }}>Tren 6 Bulan</div>
              <div style={{ color:col, fontWeight:700, fontSize:"12px", marginTop:"1px" }}>
                {((HISTORY[emp.id]?.[5]-HISTORY[emp.id]?.[0])/(HISTORY[emp.id]?.[0])*100).toFixed(1)}% naik
              </div>
            </div>
            <Spark data={HISTORY[emp.id]||[]} color={col}/>
          </div>
        </div>

        {/* Actions */}
        <div style={{ padding:"0 24px 20px", display:"flex", gap:"10px" }}>
          <button onClick={onClose} style={{ flex:1, padding:"10px", border:`1px solid ${BOR}`, borderRadius:"8px", color:MUT, background:"none", fontSize:"12px", cursor:"pointer" }}>Tutup</button>
          <button style={{ flex:1, padding:"10px", background:`linear-gradient(135deg,${col},${col}99)`, border:"none", borderRadius:"8px", color:"#fff", fontWeight:700, fontSize:"12px", cursor:"pointer" }}>⬇ Unduh PDF</button>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function PenggajianView() {
  const [list,     setList]     = useState(INIT);
  const [sel,      setSel]      = useState(null);        // payslip modal
  const [filter,   setFilter]   = useState("Semua");
  const [search,   setSearch]   = useState("");
  const [monthIdx, setMonthIdx] = useState(5);           // Jun = index 5
  const [selected, setSelected] = useState(new Set());  // bulk select
  const [view,     setView]     = useState("cards");     // "cards" | "list"

  const month = MONTHS[monthIdx];

  const filtered = useMemo(()=>
    list.filter(e=>
      (filter==="Semua"||e.status===filter) &&
      (e.nama.toLowerCase().includes(search.toLowerCase())||e.dept.toLowerCase().includes(search.toLowerCase()))
    ),[list,filter,search]);

  const totalGaji    = list.reduce((a,e)=>a+e.gaji+e.tunjangan-e.potongan,0);
  const totalDibayar = list.filter(e=>e.status==="Dibayar").reduce((a,e)=>a+e.gaji+e.tunjangan-e.potongan,0);
  const countBelum   = list.filter(e=>e.status==="Belum").length;
  const pctDibayar   = Math.round((totalDibayar/totalGaji)*100);

  // Dept breakdown
  const deptBreakdown = Object.entries(DEPT_COLOR).map(([dept,color])=>{
    const emps = list.filter(e=>e.dept===dept);
    const total = emps.reduce((a,e)=>a+e.gaji+e.tunjangan-e.potongan,0);
    return { dept, color, total, count:emps.length };
  }).filter(d=>d.count>0).sort((a,b)=>b.total-a.total);
  const maxDept = Math.max(...deptBreakdown.map(d=>d.total));

  const prosesSemua    = ()  => setList(p=>p.map(e=>e.status==="Belum"?{...e,status:"Proses"}:e));
  const prosesGaji     = (id) => setList(p=>p.map(e=>e.id===id&&e.status==="Belum" ?{...e,status:"Proses"}  :e));
  const konfirmasiGaji = (id) => setList(p=>p.map(e=>e.id===id&&e.status==="Proses"?{...e,status:"Dibayar"}:e));
  const prosesSelected = () => {
    setList(p=>p.map(e=>selected.has(e.id)&&e.status==="Belum"?{...e,status:"Proses"}:e));
    setSelected(new Set());
  };

  const toggleSelect = (id) => {
    setSelected(prev=>{
      const next=new Set(prev);
      next.has(id)?next.delete(id):next.add(id);
      return next;
    });
  };
  const toggleAll = () => {
    const belum = filtered.filter(e=>e.status==="Belum").map(e=>e.id);
    setSelected(prev=>prev.size===belum.length?new Set():new Set(belum));
  };

  return (
    <div className="space-y-4">

      {/* ── Month selector ── */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"10px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <button onClick={()=>setMonthIdx(Math.max(0,monthIdx-1))} disabled={monthIdx===0}
            style={{ width:"32px", height:"32px", border:`1px solid ${BOR}`, borderRadius:"8px", background:"#fff", cursor:monthIdx===0?"not-allowed":"pointer", color:monthIdx===0?MUT:SLA, fontSize:"14px" }}>←</button>
          <div style={{ textAlign:"center", minWidth:"140px" }}>
            <div style={{ color:SLA, fontWeight:700, fontSize:"15px" }}>{month} 2026</div>
            <div style={{ color:MUT, fontSize:"10px" }}>Periode Penggajian</div>
          </div>
          <button onClick={()=>setMonthIdx(Math.min(11,monthIdx+1))} disabled={monthIdx===11}
            style={{ width:"32px", height:"32px", border:`1px solid ${BOR}`, borderRadius:"8px", background:"#fff", cursor:monthIdx===11?"not-allowed":"pointer", color:monthIdx===11?MUT:SLA, fontSize:"14px" }}>→</button>
        </div>
        <div style={{ display:"flex", gap:"6px" }}>
          <button style={{ color:MUT, background:"#fff", border:`1px solid ${BOR}`, borderRadius:"8px", padding:"8px 14px", fontSize:"11px", fontWeight:600, cursor:"pointer" }}>⬇ Export Semua CSV</button>
          <button style={{ color:IND, background:"rgba(99,102,241,0.08)", border:`1px solid rgba(99,102,241,0.2)`, borderRadius:"8px", padding:"8px 14px", fontSize:"11px", fontWeight:700, cursor:"pointer" }}>⬇ Bulk PDF</button>
        </div>
      </div>

      {/* ── Summary cards ── */}
      <div className="grid grid-cols-3 gap-4">
        <div style={{ background:`linear-gradient(135deg,${IND},${VIO})`, borderRadius:"16px", padding:"20px", color:"#fff" }}>
          <div style={{ fontSize:"11px", opacity:0.75, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"6px" }}>Total Tagihan {month}</div>
          <div style={{ fontWeight:900, fontSize:"24px" }}>{fmt(totalGaji)}</div>
          <div style={{ fontSize:"10px", opacity:0.65, marginTop:"4px" }}>{list.length} karyawan</div>
          <div style={{ marginTop:"12px", height:"4px", background:"rgba(255,255,255,0.2)", borderRadius:"2px" }}>
            <div style={{ height:"100%", width:`${pctDibayar}%`, background:"rgba(255,255,255,0.8)", borderRadius:"2px", transition:"width 0.5s" }}/>
          </div>
          <div style={{ fontSize:"10px", opacity:0.7, marginTop:"5px" }}>{pctDibayar}% sudah dibayar</div>
        </div>
        <div style={{ background:`linear-gradient(135deg,${EME},#059669)`, borderRadius:"16px", padding:"20px", color:"#fff" }}>
          <div style={{ fontSize:"11px", opacity:0.75, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"6px" }}>Sudah Dibayar</div>
          <div style={{ fontWeight:900, fontSize:"24px" }}>{fmt(totalDibayar)}</div>
          <div style={{ fontSize:"10px", opacity:0.65, marginTop:"4px" }}>{list.filter(e=>e.status==="Dibayar").length} karyawan · {pctDibayar}%</div>
          <div style={{ marginTop:"16px", display:"flex", gap:"4px" }}>
            {list.map(e=>(
              <div key={e.id} style={{ flex:1, height:"6px", borderRadius:"3px", background:e.status==="Dibayar"?"rgba(255,255,255,0.8)":"rgba(255,255,255,0.25)" }}/>
            ))}
          </div>
        </div>
        <div style={{ background:`linear-gradient(135deg,${AMB},#d97706)`, borderRadius:"16px", padding:"20px", color:"#fff" }}>
          <div style={{ fontSize:"11px", opacity:0.75, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"6px" }}>Belum / Proses</div>
          <div style={{ fontWeight:900, fontSize:"24px" }}>{countBelum + list.filter(e=>e.status==="Proses").length}</div>
          <div style={{ fontSize:"10px", opacity:0.65, marginTop:"4px" }}>{countBelum} belum · {list.filter(e=>e.status==="Proses").length} proses</div>
          <div style={{ marginTop:"12px" }}>
            {countBelum > 0 && (
              <button onClick={prosesSemua} style={{ background:"rgba(255,255,255,0.25)", border:"1px solid rgba(255,255,255,0.4)", color:"#fff", borderRadius:"20px", padding:"5px 12px", fontSize:"10px", fontWeight:700, cursor:"pointer" }}>
                ⚡ Proses Semua
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Analytics: Dept breakdown + Avg salary ── */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Dept breakdown */}
        <div style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"14px", padding:"20px", gridColumn:"span 2" }}>
          <div style={{ color:SLA, fontWeight:700, fontSize:"13px", marginBottom:"16px" }}>Total Penggajian per Departemen</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            {deptBreakdown.map(d=>(
              <div key={d.dept}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"5px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                    <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:d.color }}/>
                    <span style={{ color:SLA, fontSize:"12px", fontWeight:500 }}>{d.dept}</span>
                    <span style={{ color:MUT, fontSize:"10px" }}>({d.count} org)</span>
                  </div>
                  <span style={{ color:SLA, fontSize:"12px", fontWeight:700 }}>{fmt(d.total)}</span>
                </div>
                <div style={{ height:"8px", background:LIG, borderRadius:"4px", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${(d.total/maxDept)*100}%`, background:d.color, borderRadius:"4px", transition:"width 0.6s" }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"14px", padding:"20px", display:"flex", flexDirection:"column", gap:"12px" }}>
          <div style={{ color:SLA, fontWeight:700, fontSize:"13px" }}>Statistik Gaji</div>
          {[
            { l:"Gaji Tertinggi", v:fmt(Math.max(...list.map(e=>e.gaji+e.tunjangan-e.potongan))), color:EME, icon:"↑" },
            { l:"Gaji Terendah",  v:fmt(Math.min(...list.map(e=>e.gaji+e.tunjangan-e.potongan))), color:AMB, icon:"↓" },
            { l:"Rata-rata",      v:fmt(Math.round(totalGaji/list.length)),                         color:IND, icon:"≈" },
            { l:"Median",         v:fmt([...list].sort((a,b)=>(a.gaji+a.tunjangan-a.potongan)-(b.gaji+b.tunjangan-b.potongan))[Math.floor(list.length/2)].gaji), color:VIO, icon:"⊙" },
          ].map(s=>(
            <div key={s.l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 10px", background:LIG, borderRadius:"8px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                <span style={{ color:s.color, fontWeight:700, fontSize:"13px" }}>{s.icon}</span>
                <span style={{ color:MUT, fontSize:"11px" }}>{s.l}</span>
              </div>
              <span style={{ color:s.color, fontWeight:700, fontSize:"12px" }}>{s.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"12px", padding:"12px 16px", display:"flex", flexWrap:"wrap", gap:"10px", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", alignItems:"center" }}>
          {/* Status filter */}
          {["Semua","Dibayar","Proses","Belum"].map(s=>(
            <button key={s} onClick={()=>setFilter(s)}
              style={{ padding:"6px 14px", borderRadius:"20px", fontSize:"11px", fontWeight:700, cursor:"pointer", border:`1px solid ${filter===s?IND:BOR}`, background:filter===s?"rgba(99,102,241,0.1)":"#fff", color:filter===s?IND:MUT }}>
              {s} {s!=="Semua"&&`(${list.filter(e=>e.status===s).length})`}
            </button>
          ))}
          {/* Search */}
          <div style={{ position:"relative" }}>
            <span style={{ position:"absolute", left:"9px", top:"50%", transform:"translateY(-50%)", color:MUT, fontSize:"11px" }}>⌕</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari karyawan..."
              style={{ paddingLeft:"26px", paddingRight:"10px", paddingTop:"6px", paddingBottom:"6px", border:`1px solid ${BOR}`, borderRadius:"20px", fontSize:"11px", color:SLA, outline:"none", width:"160px" }}
              onFocus={e=>e.target.style.borderColor=IND} onBlur={e=>e.target.style.borderColor=BOR} />
          </div>
        </div>
        <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
          {selected.size > 0 && (
            <button onClick={prosesSelected}
              style={{ background:`linear-gradient(135deg,${IND},${VIO})`, color:"#fff", border:"none", borderRadius:"8px", padding:"8px 16px", fontSize:"11px", fontWeight:700, cursor:"pointer", boxShadow:"0 4px 12px rgba(99,102,241,0.3)" }}>
              ⚡ Proses {selected.size} Terpilih
            </button>
          )}
          {/* View toggle */}
          <div style={{ display:"flex", gap:"2px", border:`1px solid ${BOR}`, borderRadius:"8px", overflow:"hidden" }}>
            {[["cards","⊞"],["list","☰"]].map(([v,ic])=>(
              <button key={v} onClick={()=>setView(v)} style={{ padding:"7px 12px", border:"none", background:view===v?`rgba(99,102,241,0.1)`:"#fff", color:view===v?IND:MUT, cursor:"pointer", fontSize:"13px" }}>{ic}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cards View ── */}
      {view==="cards" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map(emp=>{
            const takeHome = emp.gaji + emp.tunjangan - emp.potongan;
            const sc = SCFG[emp.status];
            const col = DEPT_COLOR[emp.dept] || IND;
            const isSelected = selected.has(emp.id);
            const total = emp.gaji + emp.tunjangan;
            const gajiPct = (emp.gaji/total)*100;
            const tunPct  = (emp.tunjangan/total)*100;
            return (
              <div key={emp.id}
                style={{ background:"#fff", border:`2px solid ${isSelected?IND:BOR}`, borderRadius:"16px", overflow:"hidden", transition:"all 0.2s", cursor:"default", boxShadow:isSelected?"0 0 0 4px rgba(99,102,241,0.12)":"none" }}
                onMouseEnter={e=>{ if(!isSelected) e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e=>{ if(!isSelected) e.currentTarget.style.boxShadow="none"; }}>

                {/* Color bar */}
                <div style={{ height:"4px", background:`linear-gradient(to right,${col},${col}66)` }}/>

                {/* Header */}
                <div style={{ padding:"14px 16px 10px", borderBottom:`1px solid ${BOR}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                      {/* Checkbox */}
                      {emp.status==="Belum" && (
                        <div onClick={()=>toggleSelect(emp.id)}
                          style={{ width:"18px", height:"18px", borderRadius:"5px", border:`2px solid ${isSelected?IND:BOR}`, background:isSelected?IND:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.15s" }}>
                          {isSelected && <span style={{ color:"#fff", fontSize:"10px", fontWeight:900 }}>✓</span>}
                        </div>
                      )}
                      <div style={{ width:"42px", height:"42px", borderRadius:"12px", background:`linear-gradient(135deg,${col},${col}88)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:"13px" }}>{emp.av}</div>
                    </div>
                    <span style={{ background:sc.bg, color:sc.color, fontSize:"10px", fontWeight:700, padding:"3px 8px", borderRadius:"20px", border:`1px solid ${sc.brd}` }}>
                      {sc.icon} {emp.status}
                    </span>
                  </div>
                  <div style={{ marginTop:"10px" }}>
                    <div style={{ color:SLA, fontWeight:700, fontSize:"13px" }}>{emp.nama}</div>
                    <div style={{ color:MUT, fontSize:"10px", marginTop:"1px" }}>{emp.jabatan}</div>
                    <span style={{ display:"inline-block", marginTop:"4px", background:`${col}15`, color:col, fontSize:"9px", fontWeight:700, padding:"2px 7px", borderRadius:"4px" }}>{emp.dept}</span>
                  </div>
                </div>

                {/* Salary breakdown */}
                <div style={{ padding:"12px 16px" }}>
                  {/* Salary bar */}
                  <div style={{ marginBottom:"10px" }}>
                    <div style={{ display:"flex", height:"6px", borderRadius:"3px", overflow:"hidden", marginBottom:"5px" }}>
                      <div style={{ width:`${gajiPct}%`, background:IND }}/>
                      <div style={{ width:`${tunPct}%`, background:EME, marginLeft:"1px" }}/>
                    </div>
                    <div style={{ display:"flex", gap:"10px", fontSize:"9px", color:MUT }}>
                      <span><span style={{ display:"inline-block", width:"6px", height:"6px", borderRadius:"2px", background:IND, marginRight:"3px", verticalAlign:"middle" }}/>Pokok</span>
                      <span><span style={{ display:"inline-block", width:"6px", height:"6px", borderRadius:"2px", background:EME, marginRight:"3px", verticalAlign:"middle" }}/>Tunjangan</span>
                    </div>
                  </div>

                  {/* Mini breakdown */}
                  <div style={{ display:"flex", flexDirection:"column", gap:"4px", marginBottom:"10px" }}>
                    {[
                      { l:"Gaji Pokok",  v:emp.gaji,       sign:"+", c:SLA },
                      { l:"Tunjangan",   v:emp.tunjangan,   sign:"+", c:EME },
                      { l:"Potongan",    v:emp.potongan,    sign:"-", c:ROS },
                    ].map(r=>(
                      <div key={r.l} style={{ display:"flex", justifyContent:"space-between" }}>
                        <span style={{ color:MUT, fontSize:"10px" }}>{r.l}</span>
                        <span style={{ color:r.c, fontSize:"10px", fontWeight:600 }}>{r.sign}{fmt(r.v)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Take home */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:"8px", borderTop:`1px solid ${BOR}`, marginBottom:"10px" }}>
                    <span style={{ color:SLA, fontSize:"11px", fontWeight:700 }}>Take Home</span>
                    <span style={{ color:col, fontSize:"16px", fontWeight:900 }}>{fmt(takeHome)}</span>
                  </div>

                  {/* Trend sparkline */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 10px", background:LIG, borderRadius:"8px", marginBottom:"10px" }}>
                    <div>
                      <div style={{ color:MUT, fontSize:"9px" }}>Tren 6 bulan</div>
                      <div style={{ color:EME, fontWeight:700, fontSize:"10px" }}>↑ stabil</div>
                    </div>
                    <Spark data={HISTORY[emp.id]||[]} color={col}/>
                  </div>

                  {/* Actions */}
                  <div style={{ display:"flex", gap:"5px" }}>
                    <button onClick={()=>setSel(emp)} style={{ flex:1, padding:"7px", border:`1px solid ${BOR}`, borderRadius:"8px", color:MUT, background:"none", fontSize:"10px", fontWeight:600, cursor:"pointer" }}
                      onMouseEnter={e=>e.currentTarget.style.background=LIG}
                      onMouseLeave={e=>e.currentTarget.style.background="none"}>
                      📄 Slip
                    </button>
                    {emp.status==="Belum" && (
                      <button onClick={()=>prosesGaji(emp.id)}
                        style={{ flex:2, padding:"7px", border:"none", borderRadius:"8px", background:`linear-gradient(135deg,${AMB},#d97706)`, color:"#fff", fontSize:"10px", fontWeight:700, cursor:"pointer" }}>
                        ⚡ Proses
                      </button>
                    )}
                    {emp.status==="Proses" && (
                      <button onClick={()=>konfirmasiGaji(emp.id)}
                        style={{ flex:2, padding:"7px", border:"none", borderRadius:"8px", background:`linear-gradient(135deg,${IND},${VIO})`, color:"#fff", fontSize:"10px", fontWeight:700, cursor:"pointer" }}>
                        ✓ Konfirmasi
                      </button>
                    )}
                    {emp.status==="Dibayar" && (
                      <div style={{ flex:2, padding:"7px", textAlign:"center", color:EME, fontSize:"10px", fontWeight:700 }}>✅ Lunas</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── List View ── */}
      {view==="list" && (
        <div style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"14px", overflow:"hidden" }}>
          {/* Header row */}
          <div style={{ display:"grid", gridTemplateColumns:"24px 2fr 1.2fr 1fr 1fr 1fr 1fr 1fr", gap:"0", padding:"10px 16px", background:LIG, borderBottom:`1px solid ${BOR}` }}>
            <div onClick={toggleAll} style={{ cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ width:"16px", height:"16px", borderRadius:"4px", border:`2px solid ${BOR}`, background:"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {selected.size>0&&<span style={{ fontSize:"9px", color:IND, fontWeight:900 }}>✓</span>}
              </div>
            </div>
            {["Karyawan","Gaji Pokok","Tunjangan","Potongan","Take Home","Status","Aksi"].map(h=>(
              <div key={h} style={{ color:MUT, fontSize:"10px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em" }}>{h}</div>
            ))}
          </div>
          {filtered.map((emp,i)=>{
            const takeHome = emp.gaji+emp.tunjangan-emp.potongan;
            const sc = SCFG[emp.status];
            const col = DEPT_COLOR[emp.dept]||IND;
            const isSel = selected.has(emp.id);
            return (
              <div key={emp.id} style={{ display:"grid", gridTemplateColumns:"24px 2fr 1.2fr 1fr 1fr 1fr 1fr 1fr", alignItems:"center", gap:"0", padding:"12px 16px", borderBottom:i<filtered.length-1?`1px solid ${BOR}`:"none", borderLeft:`3px solid ${sc.color}`, background:isSel?"rgba(99,102,241,0.02)":"#fff", transition:"background 0.15s" }}
                onMouseEnter={e=>{ if(!isSel) e.currentTarget.style.background=LIG; }}
                onMouseLeave={e=>{ if(!isSel) e.currentTarget.style.background="#fff"; }}>
                <div onClick={()=>emp.status==="Belum"&&toggleSelect(emp.id)} style={{ cursor:emp.status==="Belum"?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {emp.status==="Belum"&&(
                    <div style={{ width:"16px", height:"16px", borderRadius:"4px", border:`2px solid ${isSel?IND:BOR}`, background:isSel?IND:"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {isSel&&<span style={{ fontSize:"9px", color:"#fff", fontWeight:900 }}>✓</span>}
                    </div>
                  )}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                  <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:`linear-gradient(135deg,${col},${col}88)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"10px", flexShrink:0 }}>{emp.av}</div>
                  <div>
                    <div style={{ color:SLA, fontWeight:600, fontSize:"12px" }}>{emp.nama}</div>
                    <div style={{ color:MUT, fontSize:"10px" }}>{emp.dept}</div>
                  </div>
                </div>
                <div style={{ color:SLA, fontSize:"12px" }}>{fmt(emp.gaji)}</div>
                <div style={{ color:EME, fontSize:"12px" }}>+{fmt(emp.tunjangan)}</div>
                <div style={{ color:ROS, fontSize:"12px" }}>-{fmt(emp.potongan)}</div>
                <div style={{ color:col, fontWeight:700, fontSize:"13px" }}>{fmt(takeHome)}</div>
                <div><span style={{ background:sc.bg, color:sc.color, fontSize:"10px", fontWeight:700, padding:"3px 8px", borderRadius:"20px" }}>{sc.icon} {emp.status}</span></div>
                <div style={{ display:"flex", gap:"4px" }}>
                  <button onClick={()=>setSel(emp)} style={{ color:IND, background:"rgba(99,102,241,0.06)", border:"none", borderRadius:"6px", padding:"5px 8px", fontSize:"10px", cursor:"pointer" }}>Slip</button>
                  {emp.status==="Belum"&&<button onClick={()=>prosesGaji(emp.id)} style={{ color:"#fff", background:`linear-gradient(135deg,${AMB},#d97706)`, border:"none", borderRadius:"6px", padding:"5px 8px", fontSize:"10px", cursor:"pointer", fontWeight:600 }}>Proses</button>}
                  {emp.status==="Proses"&&<button onClick={()=>konfirmasiGaji(emp.id)} style={{ color:"#fff", background:`linear-gradient(135deg,${IND},${VIO})`, border:"none", borderRadius:"6px", padding:"5px 8px", fontSize:"10px", cursor:"pointer", fontWeight:600 }}>✓ Konfirmasi</button>}
                </div>
              </div>
            );
          })}
          <div style={{ padding:"10px 16px", background:LIG, borderTop:`1px solid ${BOR}`, display:"flex", justifyContent:"space-between" }}>
            <span style={{ color:MUT, fontSize:"11px" }}>Total take-home: <span style={{ color:IND, fontWeight:700 }}>{fmtFull(filtered.reduce((a,e)=>a+e.gaji+e.tunjangan-e.potongan,0))}</span></span>
            <span style={{ color:MUT, fontSize:"11px" }}>{filtered.length} karyawan</span>
          </div>
        </div>
      )}

      {/* Payslip modal */}
      {sel && <PayslipModal emp={sel} month={month} onClose={()=>setSel(null)} />}
    </div>
  );
}
