"use client";
import { useState, useMemo } from "react";

const IND="#6366f1", VIO="#8b5cf6", EME="#10b981", AMB="#f59e0b", ROS="#f43f5e", SKY="#0ea5e9";
const SLA="#1e293b", MUT="#64748b", BOR="#e2e8f0", LIG="#f8fafc";

const DEPT_COLOR = { Engineering:IND, Marketing:VIO, Finance:EME, Sales:AMB, "HR & Admin":ROS, Operasional:SKY };
const DEPTS = Object.keys(DEPT_COLOR);
const STATUS_OPTS = ["Aktif","Kontrak","Probasi"];
const SCFG = {
  Aktif:   { bg:"rgba(16,185,129,0.1)",  color:EME, brd:"rgba(16,185,129,0.25)" },
  Kontrak: { bg:"rgba(99,102,241,0.1)",  color:IND, brd:"rgba(99,102,241,0.25)" },
  Probasi: { bg:"rgba(245,158,11,0.1)",  color:AMB, brd:"rgba(245,158,11,0.25)" },
};

const INIT = [
  { id:"EMP-001", nama:"Rini Handayani",  jabatan:"Frontend Developer",  dept:"Engineering", gaji:12000000, status:"Aktif",   masuk:"01 Jun 2026", email:"rini@company.id",    phone:"0812-1111-2222", alamat:"Jl. Gatot Subroto No.8, Jakarta", kehadiran:98, sisaCuti:9,  lembur:8  },
  { id:"EMP-002", nama:"Budi Prasetyo",   jabatan:"Digital Marketer",    dept:"Marketing",   gaji:9000000,  status:"Aktif",   masuk:"28 Mei 2026", email:"budi@company.id",    phone:"0813-2222-3333", alamat:"Jl. Sudirman No.45, Bandung",    kehadiran:94, sisaCuti:12, lembur:4  },
  { id:"EMP-003", nama:"Sinta Maharani",  jabatan:"Financial Analyst",   dept:"Finance",     gaji:11000000, status:"Aktif",   masuk:"25 Mei 2026", email:"sinta@company.id",   phone:"0821-3333-4444", alamat:"Jl. Diponegoro No.3, Surabaya",  kehadiran:100,sisaCuti:10, lembur:2  },
  { id:"EMP-004", nama:"Fajar Nugroho",   jabatan:"Sales Executive",     dept:"Sales",       gaji:8500000,  status:"Probasi", masuk:"20 Mei 2026", email:"fajar@company.id",   phone:"0822-4444-5555", alamat:"Jl. Ahmad Yani No.77, Semarang", kehadiran:88, sisaCuti:5,  lembur:6  },
  { id:"EMP-005", nama:"Dewi Kusuma",     jabatan:"HR Generalist",       dept:"HR & Admin",  gaji:8000000,  status:"Aktif",   masuk:"10 Mei 2026", email:"dewi@company.id",    phone:"0819-5555-6666", alamat:"Jl. Imam Bonjol No.21, Medan",   kehadiran:92, sisaCuti:8,  lembur:3  },
  { id:"EMP-006", nama:"Hendra Jaya",     jabatan:"Backend Developer",   dept:"Engineering", gaji:14000000, status:"Kontrak", masuk:"01 Apr 2026", email:"hendra@company.id",  phone:"0878-6666-7777", alamat:"Jl. Pemuda No.56, Bekasi",       kehadiran:96, sisaCuti:7,  lembur:15 },
  { id:"EMP-007", nama:"Ahmad Rizky",     jabatan:"Operations Manager",  dept:"Operasional", gaji:13000000, status:"Aktif",   masuk:"15 Mar 2026", email:"ahmad@company.id",   phone:"0857-7777-8888", alamat:"Jl. Asia Afrika No.3, Bandung",  kehadiran:98, sisaCuti:11, lembur:10 },
  { id:"EMP-008", nama:"Lina Santoso",    jabatan:"Brand Strategist",    dept:"Marketing",   gaji:10500000, status:"Aktif",   masuk:"01 Feb 2026", email:"lina@company.id",    phone:"0877-8888-9999", alamat:"Jl. Braga No.12, Bandung",       kehadiran:96, sisaCuti:13, lembur:5  },
  { id:"EMP-009", nama:"Rizky Pratama",   jabatan:"UI/UX Designer",      dept:"Engineering", gaji:11500000, status:"Aktif",   masuk:"15 Jan 2026", email:"rizky@company.id",   phone:"0812-9999-0000", alamat:"Jl. Thamrin No.28, Jakarta",     kehadiran:95, sisaCuti:14, lembur:7  },
  { id:"EMP-010", nama:"Nita Sari",       jabatan:"Accountant",          dept:"Finance",     gaji:9500000,  status:"Aktif",   masuk:"01 Jan 2026", email:"nita@company.id",    phone:"0821-0000-1111", alamat:"Jl. Gajah Mada No.5, Semarang",  kehadiran:93, sisaCuti:15, lembur:1  },
  { id:"EMP-011", nama:"Doni Pratama",    jabatan:"Supply Chain",        dept:"Operasional", gaji:9000000,  status:"Kontrak", masuk:"01 Des 2025", email:"doni@company.id",    phone:"0857-1122-3344", alamat:"Jl. Kaliurang No.88, Yogyakarta", kehadiran:90, sisaCuti:6,  lembur:9  },
  { id:"EMP-012", nama:"Maya Indah",      jabatan:"Sales Manager",       dept:"Sales",       gaji:12500000, status:"Aktif",   masuk:"15 Nov 2025", email:"maya@company.id",    phone:"0813-5566-7788", alamat:"Jl. Merdeka No.1, Jakarta",       kehadiran:97, sisaCuti:10, lembur:12 },
];

const BLANK = { nama:"", jabatan:"", dept:DEPTS[0], gaji:"", status:"Aktif", masuk:"", email:"", phone:"", alamat:"" };

function av(name) { return name.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase(); }
function duration(dateStr) {
  const d = new Date(dateStr.split(" ").reverse().join("-").replace(/(\w+)\s(\d+)\s(\d+)/,"$3-$2-$1"));
  const months = Math.floor((new Date("2026-06-08") - d)/(1000*60*60*24*30));
  if (months < 1) return "Baru";
  if (months < 12) return `${months} bln`;
  return `${Math.floor(months/12)} thn`;
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

/* ── Employee Detail Modal ── */
function DetailModal({ emp, onClose, onEdit }) {
  const col = DEPT_COLOR[emp.dept] || IND;
  const sc  = SCFG[emp.status];
  const attendBars = [85,90,100,88,96,100,emp.kehadiran]; // last 7 days %
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(15,23,42,0.5)", zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}
      onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{ background:"#fff", borderRadius:"20px", width:"100%", maxWidth:"520px", overflow:"hidden", boxShadow:"0 24px 64px rgba(0,0,0,0.15)" }}>

        {/* Profile header */}
        <div style={{ background:`linear-gradient(135deg,${col},${col}bb)`, padding:"28px 28px 20px", position:"relative" }}>
          <button onClick={onClose} style={{ position:"absolute", top:"16px", right:"16px", background:"rgba(255,255,255,0.2)", border:"none", borderRadius:"50%", width:"30px", height:"30px", color:"#fff", cursor:"pointer", fontSize:"14px" }}>✕</button>
          <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
            <div style={{ width:"70px", height:"70px", borderRadius:"50%", background:"rgba(255,255,255,0.25)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:"22px", border:"3px solid rgba(255,255,255,0.4)" }}>
              {av(emp.nama)}
            </div>
            <div>
              <div style={{ color:"#fff", fontWeight:900, fontSize:"18px" }}>{emp.nama}</div>
              <div style={{ color:"rgba(255,255,255,0.8)", fontSize:"12px", marginTop:"2px" }}>{emp.jabatan}</div>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginTop:"8px" }}>
                <span style={{ background:"rgba(255,255,255,0.2)", color:"#fff", fontSize:"10px", fontWeight:700, padding:"3px 9px", borderRadius:"20px" }}>{emp.dept}</span>
                <span style={{ background:sc.bg, color:sc.color, fontSize:"10px", fontWeight:700, padding:"3px 9px", borderRadius:"20px", border:`1px solid ${sc.brd}` }}>{emp.status}</span>
              </div>
            </div>
          </div>
          {/* Quick stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px", marginTop:"20px" }}>
            {[
              { l:"Kehadiran",  v:`${emp.kehadiran}%`, icon:"✅" },
              { l:"Sisa Cuti",  v:`${emp.sisaCuti} hr`, icon:"🌴" },
              { l:"Lembur",     v:`${emp.lembur} jam`,  icon:"⏰" },
            ].map(s=>(
              <div key={s.l} style={{ background:"rgba(255,255,255,0.15)", borderRadius:"10px", padding:"10px", textAlign:"center", backdropFilter:"blur(8px)" }}>
                <div style={{ fontSize:"16px" }}>{s.icon}</div>
                <div style={{ color:"#fff", fontWeight:900, fontSize:"15px", marginTop:"2px" }}>{s.v}</div>
                <div style={{ color:"rgba(255,255,255,0.65)", fontSize:"9px" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding:"20px 28px" }}>
          {/* Contact + Employment */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {[
              { l:"ID Karyawan",  v:emp.id,    icon:"🪪" },
              { l:"Email",        v:emp.email, icon:"✉"  },
              { l:"Telepon",      v:emp.phone, icon:"📱" },
              { l:"Gaji",         v:"Rp "+emp.gaji.toLocaleString("id-ID"), icon:"💰" },
              { l:"Bergabung",    v:emp.masuk, icon:"📅" },
              { l:"Durasi",       v:duration(emp.masuk), icon:"⏱"  },
            ].map(r=>(
              <div key={r.l} style={{ display:"flex", alignItems:"flex-start", gap:"8px" }}>
                <span style={{ fontSize:"14px", marginTop:"1px" }}>{r.icon}</span>
                <div>
                  <div style={{ color:MUT, fontSize:"10px", fontWeight:600 }}>{r.l}</div>
                  <div style={{ color:SLA, fontWeight:600, fontSize:"12px", marginTop:"1px" }}>{r.v}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Alamat */}
          <div style={{ display:"flex", gap:"8px", marginTop:"14px", padding:"10px 12px", background:LIG, borderRadius:"8px" }}>
            <span style={{ fontSize:"14px" }}>📍</span>
            <div>
              <div style={{ color:MUT, fontSize:"10px", fontWeight:600 }}>Alamat</div>
              <div style={{ color:SLA, fontWeight:500, fontSize:"12px", marginTop:"1px" }}>{emp.alamat}</div>
            </div>
          </div>

          {/* Attendance 7 days */}
          <div style={{ marginTop:"16px" }}>
            <div style={{ color:SLA, fontSize:"12px", fontWeight:600, marginBottom:"8px" }}>Kehadiran 7 Hari Terakhir</div>
            <div style={{ display:"flex", gap:"5px", alignItems:"flex-end", height:"40px" }}>
              {attendBars.map((v,i)=>{
                const ok = v>=90 ? EME : v>=80 ? AMB : ROS;
                const days=["Sen","Sel","Rab","Kam","Jum","Sen","Sel"];
                return (
                  <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"3px" }}>
                    <div style={{ width:"100%", height:"28px", background:"rgba(0,0,0,0.04)", borderRadius:"4px", position:"relative", overflow:"hidden" }}>
                      <div style={{ position:"absolute", bottom:0, left:0, right:0, background:ok, borderRadius:"3px", height:`${v}%`, opacity:0.8 }}/>
                    </div>
                    <span style={{ color:MUT, fontSize:"8px" }}>{days[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display:"flex", gap:"10px", marginTop:"20px", paddingTop:"16px", borderTop:`1px solid ${BOR}` }}>
            <button onClick={onClose} style={{ flex:1, padding:"10px", border:`1px solid ${BOR}`, borderRadius:"8px", color:MUT, background:"none", fontSize:"12px", cursor:"pointer" }}>Tutup</button>
            <button onClick={onEdit} style={{ flex:1, padding:"10px", border:`1px solid ${col}`, borderRadius:"8px", color:col, background:`${col}11`, fontSize:"12px", fontWeight:600, cursor:"pointer" }}>✎ Edit</button>
            <button style={{ flex:1, padding:"10px", background:`linear-gradient(135deg,${col},${col}bb)`, border:"none", borderRadius:"8px", color:"#fff", fontSize:"12px", fontWeight:700, cursor:"pointer" }}>⬇ Unduh Profil</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function KaryawanView() {
  const [list,    setList]    = useState(INIT);
  const [search,  setSearch]  = useState("");
  const [deptF,   setDeptF]   = useState("Semua");
  const [sort,    setSort]    = useState("nama");
  const [view,    setView]    = useState("grid");
  const [modal,   setModal]   = useState(null);
  const [sel,     setSel]     = useState(null);
  const [detail,  setDetail]  = useState(null);
  const [form,    setForm]    = useState(BLANK);

  const filtered = useMemo(()=>{
    let r = list.filter(k=>
      (deptF==="Semua"||k.dept===deptF) &&
      (k.nama.toLowerCase().includes(search.toLowerCase())||
       k.jabatan.toLowerCase().includes(search.toLowerCase())||
       k.id.toLowerCase().includes(search.toLowerCase()))
    );
    if (sort==="nama")  r = [...r].sort((a,b)=>a.nama.localeCompare(b.nama));
    if (sort==="gaji")  r = [...r].sort((a,b)=>b.gaji-a.gaji);
    if (sort==="masuk") r = [...r].sort((a,b)=>new Date(b.masuk.split(" ").reverse().join("-"))-new Date(a.masuk.split(" ").reverse().join("-")));
    if (sort==="hadir") r = [...r].sort((a,b)=>b.kehadiran-a.kehadiran);
    return r;
  }, [list,search,deptF,sort]);

  const deptStats = DEPTS.map(d=>({ d, n:list.filter(k=>k.dept===d).length }));

  const openAdd   = ()  => { setForm(BLANK); setModal("add"); };
  const openEdit  = (k) => { setSel(k); setForm({...k,gaji:String(k.gaji)}); setModal("edit"); setDetail(null); };
  const openDel   = (k) => { setSel(k); setModal("delete"); };
  const closeModal= ()  => { setModal(null); setSel(null); };

  const save = (e) => {
    e.preventDefault();
    if (modal==="add") {
      setList(l=>[...l,{...form, id:`EMP-${String(l.length+1).padStart(3,"0")}`, gaji:Number(form.gaji), kehadiran:100, sisaCuti:12, lembur:0}]);
    } else {
      setList(l=>l.map(k=>k.id===sel.id?{...k,...form,gaji:Number(form.gaji)}:k));
    }
    closeModal();
  };

  const hapus = () => { setList(l=>l.filter(k=>k.id!==sel.id)); closeModal(); setDetail(null); };
  const f = k => e => setForm(p=>({...p,[k]:e.target.value}));

  return (
    <div className="space-y-4">

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { l:"Total Karyawan", v:list.length,                                  icon:"👥", from:IND, to:VIO  },
          { l:"Karyawan Aktif", v:list.filter(x=>x.status==="Aktif").length,    icon:"✅", from:EME, to:"#059669" },
          { l:"Rata-rata Hadir",v:Math.round(list.reduce((a,k)=>a+k.kehadiran,0)/list.length)+"%", icon:"📊", from:SKY, to:"#0284c7" },
          { l:"Avg. Gaji",      v:"Rp "+(Math.round(list.reduce((a,k)=>a+k.gaji,0)/list.length/1000000*10)/10)+"jt", icon:"💰", from:AMB, to:"#d97706" },
        ].map(s=>(
          <div key={s.l} style={{ background:`linear-gradient(135deg,${s.from},${s.to})`, borderRadius:"14px", padding:"18px", color:"#fff", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:"-8px", right:"-8px", fontSize:"48px", opacity:0.12 }}>{s.icon}</div>
            <div style={{ fontSize:"22px" }}>{s.icon}</div>
            <div style={{ fontWeight:900, fontSize:"22px", marginTop:"4px" }}>{s.v}</div>
            <div style={{ fontSize:"11px", opacity:0.8, marginTop:"2px" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── Dept mini pills ── */}
      <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
        <button onClick={()=>setDeptF("Semua")} style={{ padding:"6px 14px", borderRadius:"20px", fontSize:"11px", fontWeight:700, cursor:"pointer", border:`1px solid ${deptF==="Semua"?IND:BOR}`, background:deptF==="Semua"?`rgba(99,102,241,0.1)`:"#fff", color:deptF==="Semua"?IND:MUT }}>
          Semua ({list.length})
        </button>
        {deptStats.map(({d,n})=>(
          <button key={d} onClick={()=>setDeptF(deptF===d?"Semua":d)}
            style={{ padding:"6px 14px", borderRadius:"20px", fontSize:"11px", fontWeight:700, cursor:"pointer", border:`1px solid ${deptF===d?DEPT_COLOR[d]:BOR}`, background:deptF===d?`${DEPT_COLOR[d]}18`:"#fff", color:deptF===d?DEPT_COLOR[d]:MUT, display:"flex", alignItems:"center", gap:"5px" }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:DEPT_COLOR[d], display:"inline-block" }}/>
            {d} ({n})
          </button>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"12px", padding:"12px 16px", display:"flex", flexWrap:"wrap", gap:"10px", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", flex:1 }}>
          {/* Search */}
          <div style={{ position:"relative" }}>
            <span style={{ position:"absolute", left:"10px", top:"50%", transform:"translateY(-50%)", color:MUT, fontSize:"12px" }}>⌕</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari nama, jabatan, ID..."
              style={{ paddingLeft:"28px", paddingRight:"12px", paddingTop:"8px", paddingBottom:"8px", border:`1px solid ${BOR}`, borderRadius:"8px", fontSize:"12px", color:SLA, outline:"none", width:"210px" }}
              onFocus={e=>e.target.style.borderColor=IND} onBlur={e=>e.target.style.borderColor=BOR} />
          </div>
          {/* Sort */}
          <select value={sort} onChange={e=>setSort(e.target.value)}
            style={{ border:`1px solid ${BOR}`, borderRadius:"8px", padding:"8px 12px", fontSize:"12px", color:SLA, outline:"none" }}>
            <option value="nama">Urutkan: Nama</option>
            <option value="gaji">Urutkan: Gaji Tertinggi</option>
            <option value="masuk">Urutkan: Terbaru</option>
            <option value="hadir">Urutkan: Kehadiran</option>
          </select>
          {/* View toggle */}
          <div style={{ display:"flex", gap:"2px", border:`1px solid ${BOR}`, borderRadius:"8px", overflow:"hidden" }}>
            {[["grid","⊞"],["list","☰"]].map(([v,ic])=>(
              <button key={v} onClick={()=>setView(v)} style={{ padding:"8px 12px", border:"none", background:view===v?`rgba(99,102,241,0.1)`:"transparent", color:view===v?IND:MUT, cursor:"pointer", fontSize:"13px" }}>{ic}</button>
            ))}
          </div>
        </div>
        <button onClick={openAdd} style={{ background:`linear-gradient(135deg,${IND},${VIO})`, color:"#fff", border:"none", borderRadius:"8px", padding:"9px 20px", fontSize:"12px", fontWeight:700, cursor:"pointer", boxShadow:"0 4px 12px rgba(99,102,241,0.3)", whiteSpace:"nowrap" }}>
          + Tambah Karyawan
        </button>
      </div>

      {/* ── Card Grid ── */}
      {view==="grid" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map(k=>{
            const col = DEPT_COLOR[k.dept]||IND;
            const sc  = SCFG[k.status];
            return (
              <div key={k.id} style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"16px", overflow:"hidden", cursor:"pointer", transition:"all 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.boxShadow=`0 8px 24px rgba(0,0,0,0.1)`; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="translateY(0)"; }}
                onClick={()=>setDetail(k)}>
                {/* Color strip */}
                <div style={{ height:"5px", background:`linear-gradient(to right,${col},${col}88)` }}/>
                {/* Header */}
                <div style={{ padding:"16px 16px 12px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"12px" }}>
                    <div style={{ width:"46px", height:"46px", borderRadius:"14px", background:`linear-gradient(135deg,${col},${col}88)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:"14px" }}>
                      {av(k.nama)}
                    </div>
                    <span style={{ background:sc.bg, color:sc.color, fontSize:"10px", fontWeight:700, padding:"3px 8px", borderRadius:"20px" }}>{k.status}</span>
                  </div>
                  <div style={{ color:SLA, fontWeight:700, fontSize:"14px" }}>{k.nama}</div>
                  <div style={{ color:MUT, fontSize:"11px", marginTop:"2px" }}>{k.jabatan}</div>
                  <span style={{ display:"inline-block", marginTop:"6px", background:`${col}18`, color:col, fontSize:"10px", fontWeight:700, padding:"2px 8px", borderRadius:"4px" }}>{k.dept}</span>
                </div>
                {/* Stats */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderTop:`1px solid ${BOR}`, borderBottom:`1px solid ${BOR}` }}>
                  {[
                    { l:"Hadir",    v:`${k.kehadiran}%`, c:k.kehadiran>=95?EME:k.kehadiran>=85?AMB:ROS },
                    { l:"Sisa Cuti",v:`${k.sisaCuti}hr`, c:SLA },
                    { l:"Durasi",   v:duration(k.masuk), c:IND },
                  ].map(s=>(
                    <div key={s.l} style={{ padding:"8px 6px", textAlign:"center" }}>
                      <div style={{ color:s.c, fontWeight:700, fontSize:"12px" }}>{s.v}</div>
                      <div style={{ color:MUT, fontSize:"9px" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                {/* Actions */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
                  <button onClick={e=>{ e.stopPropagation(); setDetail(k); }}
                    style={{ padding:"10px", color:IND, background:"none", border:"none", borderRight:`1px solid ${BOR}`, fontSize:"11px", fontWeight:600, cursor:"pointer" }}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(99,102,241,0.05)"}
                    onMouseLeave={e=>e.currentTarget.style.background="none"}>Detail</button>
                  <button onClick={e=>{ e.stopPropagation(); openEdit(k); }}
                    style={{ padding:"10px", color:MUT, background:"none", border:"none", borderRight:`1px solid ${BOR}`, fontSize:"11px", fontWeight:600, cursor:"pointer" }}
                    onMouseEnter={e=>e.currentTarget.style.background=LIG}
                    onMouseLeave={e=>e.currentTarget.style.background="none"}>Edit</button>
                  <button onClick={e=>{ e.stopPropagation(); openDel(k); }}
                    style={{ padding:"10px", color:ROS, background:"none", border:"none", fontSize:"11px", fontWeight:600, cursor:"pointer" }}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(244,63,94,0.05)"}
                    onMouseLeave={e=>e.currentTarget.style.background="none"}>Hapus</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── List View ── */}
      {view==="list" && (
        <div style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"14px", overflow:"hidden" }}>
          {filtered.map((k,i)=>{
            const col=DEPT_COLOR[k.dept]||IND;
            const sc=SCFG[k.status];
            return (
              <div key={k.id} style={{ display:"flex", alignItems:"center", gap:"14px", padding:"13px 20px", borderBottom:i<filtered.length-1?`1px solid ${BOR}`:"none", cursor:"pointer", transition:"background 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.background=LIG}
                onMouseLeave={e=>e.currentTarget.style.background="#fff"}
                onClick={()=>setDetail(k)}>
                <div style={{ width:"40px", height:"40px", borderRadius:"12px", background:`linear-gradient(135deg,${col},${col}88)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"13px", flexShrink:0 }}>{av(k.nama)}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ color:SLA, fontWeight:600, fontSize:"13px" }}>{k.nama}</div>
                  <div style={{ color:MUT, fontSize:"11px" }}>{k.jabatan}</div>
                </div>
                <span style={{ background:`${col}18`, color:col, fontSize:"10px", fontWeight:700, padding:"3px 10px", borderRadius:"20px", whiteSpace:"nowrap" }}>{k.dept}</span>
                <span style={{ background:sc.bg, color:sc.color, fontSize:"10px", fontWeight:700, padding:"3px 8px", borderRadius:"20px", whiteSpace:"nowrap" }}>{k.status}</span>
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <div style={{ color:SLA, fontWeight:700, fontSize:"12px" }}>Rp {(k.gaji/1000000).toFixed(1)}jt</div>
                  <div style={{ color:k.kehadiran>=95?EME:k.kehadiran>=85?AMB:ROS, fontSize:"10px", fontWeight:700 }}>{k.kehadiran}% hadir</div>
                </div>
                <div style={{ display:"flex", gap:"5px", flexShrink:0 }}>
                  <button onClick={e=>{ e.stopPropagation(); openEdit(k); }} style={{ color:IND, background:`rgba(99,102,241,0.08)`, border:"none", borderRadius:"6px", padding:"5px 10px", fontSize:"11px", cursor:"pointer" }}>Edit</button>
                  <button onClick={e=>{ e.stopPropagation(); openDel(k); }} style={{ color:ROS, background:`rgba(244,63,94,0.08)`, border:"none", borderRadius:"6px", padding:"5px 10px", fontSize:"11px", cursor:"pointer" }}>Hapus</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ color:MUT, fontSize:"12px", textAlign:"center" }}>
        Menampilkan <span style={{ color:IND, fontWeight:700 }}>{filtered.length}</span> dari {list.length} karyawan
      </div>

      {/* ── Detail Modal ── */}
      {detail && <DetailModal emp={detail} onClose={()=>setDetail(null)} onEdit={()=>openEdit(detail)} />}

      {/* ── Add/Edit Modal ── */}
      {(modal==="add"||modal==="edit") && (
        <div style={{ position:"fixed", inset:0, background:"rgba(15,23,42,0.45)", zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}
          onClick={e=>{if(e.target===e.currentTarget)closeModal();}}>
          <div style={{ background:"#fff", borderRadius:"20px", padding:"28px", width:"100%", maxWidth:"520px", boxShadow:"0 24px 64px rgba(0,0,0,0.15)", maxHeight:"90vh", overflowY:"auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
              <h3 style={{ color:SLA, fontWeight:700, fontSize:"16px", margin:0 }}>{modal==="add"?"Tambah Karyawan":"Edit Karyawan"}</h3>
              <button onClick={closeModal} style={{ background:"none", border:"none", cursor:"pointer", color:MUT, fontSize:"18px" }}>✕</button>
            </div>
            <div style={{ height:"3px", background:`linear-gradient(to right,${IND},${VIO})`, borderRadius:"2px", margin:"14px 0 22px" }}/>
            <form onSubmit={save} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Nama Lengkap" required placeholder="Nama..." value={form.nama} onChange={f("nama")} />
                <Input label="Jabatan" required placeholder="Frontend Dev" value={form.jabatan} onChange={f("jabatan")} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Gaji (Rp)" required type="number" placeholder="12000000" value={form.gaji} onChange={f("gaji")} />
                <Input label="Tanggal Masuk" required type="date" value={form.masuk} onChange={f("masuk")} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Email" type="email" placeholder="email@company.id" value={form.email} onChange={f("email")} />
                <Input label="Telepon" placeholder="0812-xxx" value={form.phone} onChange={f("phone")} />
              </div>
              <Input label="Alamat" placeholder="Jl. ..." value={form.alamat} onChange={f("alamat")} />
              <div className="grid grid-cols-2 gap-3">
                {[{k:"dept",l:"Departemen",opts:DEPTS},{k:"status",l:"Status",opts:STATUS_OPTS}].map(s=>(
                  <div key={s.k}>
                    <label style={{ display:"block", color:MUT, fontSize:"11px", fontWeight:600, marginBottom:"4px", textTransform:"uppercase", letterSpacing:"0.05em" }}>{s.l}</label>
                    <select value={form[s.k]} onChange={f(s.k)} style={{ width:"100%", border:`1px solid ${BOR}`, borderRadius:"8px", padding:"9px 12px", fontSize:"13px", color:SLA, outline:"none" }}>
                      {s.opts.map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:"10px", paddingTop:"4px" }}>
                <button type="button" onClick={closeModal} style={{ flex:1, padding:"11px", border:`1px solid ${BOR}`, borderRadius:"8px", color:MUT, fontWeight:600, fontSize:"13px", cursor:"pointer", background:"none" }}>Batal</button>
                <button type="submit" style={{ flex:1, padding:"11px", background:`linear-gradient(135deg,${IND},${VIO})`, border:"none", borderRadius:"8px", color:"#fff", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>
                  {modal==="add"?"Simpan":"Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete ── */}
      {modal==="delete" && (
        <div style={{ position:"fixed", inset:0, background:"rgba(15,23,42,0.45)", zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}
          onClick={e=>{if(e.target===e.currentTarget)closeModal();}}>
          <div style={{ background:"#fff", borderRadius:"20px", padding:"28px", width:"100%", maxWidth:"360px", boxShadow:"0 24px 64px rgba(0,0,0,0.15)", textAlign:"center" }}>
            <div style={{ fontSize:"38px", marginBottom:"10px" }}>🗑</div>
            <h3 style={{ color:SLA, fontWeight:700, fontSize:"16px", marginBottom:"6px" }}>Hapus Karyawan?</h3>
            <p style={{ color:ROS, fontWeight:700, fontSize:"13px", marginBottom:"16px" }}>{sel?.nama}</p>
            <p style={{ color:MUT, fontSize:"12px", marginBottom:"20px" }}>Data tidak dapat dikembalikan.</p>
            <div style={{ display:"flex", gap:"10px" }}>
              <button onClick={closeModal} style={{ flex:1, padding:"11px", border:`1px solid ${BOR}`, borderRadius:"8px", color:MUT, fontWeight:600, fontSize:"13px", cursor:"pointer", background:"none" }}>Batal</button>
              <button onClick={hapus} style={{ flex:1, padding:"11px", background:ROS, border:"none", borderRadius:"8px", color:"#fff", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
