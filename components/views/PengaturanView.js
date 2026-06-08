"use client";
import { useState } from "react";

const IND="#6366f1", VIO="#8b5cf6", EME="#10b981", ROS="#f43f5e";
const SLA="#1e293b", MUT="#64748b", BOR="#e2e8f0", LIG="#f8fafc";

const MENUS = [
  { id:"perusahaan", icon:"🏢", label:"Perusahaan",    desc:"Info & profil perusahaan" },
  { id:"departemen", icon:"🏗",  label:"Departemen",    desc:"Kelola struktur organisasi" },
  { id:"jabatan",    icon:"👔",  label:"Jabatan",       desc:"Daftar posisi & level", demo:true },
  { id:"notif",      icon:"🔔",  label:"Notifikasi",    desc:"Atur pemberitahuan",     demo:true },
  { id:"sistem",     icon:"⚙",   label:"Sistem",        desc:"Konfigurasi & backup",   demo:true },
];

function Input({ label, ...props }) {
  return (
    <div>
      <label style={{ display:"block", color:MUT, fontSize:"11px", fontWeight:600, marginBottom:"4px", textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</label>
      <input {...props} style={{ width:"100%", border:`1px solid ${BOR}`, borderRadius:"8px", padding:"9px 12px", fontSize:"13px", color:SLA, outline:"none", boxSizing:"border-box", background:"#fff" }}
        onFocus={e=>{ e.target.style.borderColor=IND; e.target.style.boxShadow=`0 0 0 3px rgba(99,102,241,0.1)`; }}
        onBlur={e =>{ e.target.style.borderColor=BOR; e.target.style.boxShadow="none"; }} />
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <div onClick={()=>onChange(!value)} style={{ width:"44px", height:"24px", background:value?`rgba(99,102,241,0.15)`:"rgba(0,0,0,0.06)", border:`1px solid ${value?IND:BOR}`, borderRadius:"12px", position:"relative", cursor:"pointer", transition:"all 0.2s" }}>
      <div style={{ position:"absolute", top:"3px", left:value?"23px":"3px", width:"16px", height:"16px", borderRadius:"50%", background:value?IND:"#aaa", transition:"all 0.2s", boxShadow:value?"0 2px 6px rgba(99,102,241,0.4)":"none" }}/>
    </div>
  );
}

function useSave() {
  const [st, setSt] = useState(null);
  const save = () => { setSt("saving"); setTimeout(()=>{ setSt("saved"); setTimeout(()=>setSt(null),2000); },600); };
  return { st, save };
}

function SaveBar({ st, onSave }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:"20px", borderTop:`1px solid ${BOR}`, marginTop:"8px" }}>
      {st==="saved"
        ? <span style={{ color:EME, fontSize:"12px", fontWeight:700 }}>✓ Perubahan disimpan</span>
        : <span/>}
      <button onClick={onSave} disabled={st==="saving"}
        style={{ background:`linear-gradient(135deg,${IND},${VIO})`, border:"none", borderRadius:"8px", color:"#fff", padding:"9px 22px", fontSize:"12px", fontWeight:700, cursor:"pointer", boxShadow:"0 4px 12px rgba(99,102,241,0.3)", opacity:st==="saving"?0.6:1 }}>
        {st==="saving"?"Menyimpan...":"Simpan Perubahan"}
      </button>
    </div>
  );
}

/* ── Sections ── */
function PerusahaanSection() {
  const { st, save } = useSave();
  const [form, setForm] = useState({ nama:"PT Coderaft Indonesia", industri:"Teknologi", alamat:"Jl. Sudirman No.45", kota:"Jakarta", npwp:"01.234.567.8-901.000", berdiri:"2022", website:"coderaft.id", email:"hr@coderaft.id" });
  const f = k => e => setForm(p=>({...p,[k]:e.target.value}));
  return (
    <div className="space-y-5">
      <div>
        <h3 style={{ color:SLA, fontWeight:700, fontSize:"15px", marginBottom:"3px" }}>Profil Perusahaan</h3>
        <p style={{ color:MUT, fontSize:"12px" }}>Informasi dasar perusahaan yang digunakan di seluruh sistem</p>
        <div style={{ height:"3px", background:`linear-gradient(to right,${IND},${VIO})`, borderRadius:"2px", marginTop:"12px" }}/>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Nama Perusahaan" value={form.nama} onChange={f("nama")} />
        <Input label="Industri" value={form.industri} onChange={f("industri")} />
        <Input label="Alamat" value={form.alamat} onChange={f("alamat")} />
        <Input label="Kota" value={form.kota} onChange={f("kota")} />
        <Input label="NPWP" value={form.npwp} onChange={f("npwp")} />
        <Input label="Tahun Berdiri" type="number" value={form.berdiri} onChange={f("berdiri")} />
        <Input label="Website" value={form.website} onChange={f("website")} />
        <Input label="Email HR" type="email" value={form.email} onChange={f("email")} />
      </div>
      <SaveBar st={st} onSave={save} />
    </div>
  );
}

function DepartemenSection() {
  const [depts, setDepts] = useState([
    { id:1, nama:"Engineering",  kepala:"Hendra Jaya",    jumlah:32, warna:IND  },
    { id:2, nama:"Marketing",    kepala:"Lina Santoso",   jumlah:24, warna:VIO  },
    { id:3, nama:"Operasional",  kepala:"Ahmad Rizky",    jumlah:28, warna:EME  },
    { id:4, nama:"Finance",      kepala:"Sinta Maharani", jumlah:18, warna:"#f59e0b" },
    { id:5, nama:"HR & Admin",   kepala:"Dewi Kusuma",    jumlah:14, warna:ROS  },
    { id:6, nama:"Sales",        kepala:"Fajar Nugroho",  jumlah:12, warna:"#06b6d4" },
  ]);
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState({ nama:"", kepala:"" });

  return (
    <div className="space-y-4">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <h3 style={{ color:SLA, fontWeight:700, fontSize:"15px", marginBottom:"3px" }}>Struktur Departemen</h3>
          <p style={{ color:MUT, fontSize:"12px" }}>Kelola departemen dan kepala departemen</p>
        </div>
        <button onClick={()=>{ setForm({nama:"",kepala:""}); setModal("add"); }}
          style={{ background:`linear-gradient(135deg,${IND},${VIO})`, color:"#fff", border:"none", borderRadius:"8px", padding:"8px 16px", fontSize:"12px", fontWeight:700, cursor:"pointer" }}>
          + Tambah
        </button>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
        {depts.map((d,i)=>(
          <div key={d.id} style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"12px", padding:"14px 16px", display:"flex", alignItems:"center", gap:"14px" }}>
            <div style={{ width:"10px", height:"40px", borderRadius:"5px", background:d.warna, flexShrink:0 }}/>
            <div style={{ flex:1 }}>
              <div style={{ color:SLA, fontWeight:700, fontSize:"13px" }}>{d.nama}</div>
              <div style={{ color:MUT, fontSize:"11px" }}>Kepala: {d.kepala}</div>
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ color:IND, fontWeight:900, fontSize:"18px" }}>{d.jumlah}</div>
              <div style={{ color:MUT, fontSize:"10px" }}>karyawan</div>
            </div>
            <button onClick={()=>setDepts(prev=>prev.filter(x=>x.id!==d.id))}
              style={{ color:ROS, background:"none", border:`1px solid rgba(244,63,94,0.2)`, borderRadius:"8px", padding:"6px 12px", fontSize:"11px", cursor:"pointer" }}>
              Hapus
            </button>
          </div>
        ))}
      </div>

      {modal==="add" && (
        <div style={{ position:"fixed", inset:0, background:"rgba(15,23,42,0.45)", zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}
          onClick={e=>{if(e.target===e.currentTarget)setModal(null);}}>
          <div style={{ background:"#fff", borderRadius:"16px", padding:"24px", width:"100%", maxWidth:"380px", boxShadow:"0 16px 48px rgba(0,0,0,0.12)" }}>
            <h3 style={{ color:SLA, fontWeight:700, fontSize:"15px", marginBottom:"16px" }}>Tambah Departemen</h3>
            <div className="space-y-3">
              <Input label="Nama Departemen" placeholder="Engineering" value={form.nama} onChange={e=>setForm(p=>({...p,nama:e.target.value}))} />
              <Input label="Kepala Departemen" placeholder="Nama kepala" value={form.kepala} onChange={e=>setForm(p=>({...p,kepala:e.target.value}))} />
            </div>
            <div style={{ display:"flex", gap:"10px", marginTop:"16px" }}>
              <button onClick={()=>setModal(null)} style={{ flex:1, padding:"10px", border:`1px solid ${BOR}`, borderRadius:"8px", color:MUT, background:"none", cursor:"pointer" }}>Batal</button>
              <button onClick={()=>{ if(form.nama){ setDepts(prev=>[...prev,{id:Date.now(),nama:form.nama,kepala:form.kepala||"-",jumlah:0,warna:IND}]); setModal(null); } }}
                style={{ flex:1, padding:"10px", background:`linear-gradient(135deg,${IND},${VIO})`, border:"none", borderRadius:"8px", color:"#fff", fontWeight:700, cursor:"pointer" }}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main ── */
export default function PengaturanView() {
  const [active, setActive] = useState("perusahaan");
  const activeMenu = MENUS.find(m=>m.id===active);
  const sections = { perusahaan:<PerusahaanSection/>, departemen:<DepartemenSection/> };

  return (
    <div style={{ display:"flex", gap:"12px", height:"calc(100vh - 176px)", minHeight:"520px" }}>

      {/* Left sidebar */}
      <div style={{ width:"220px", flexShrink:0, display:"flex", flexDirection:"column", gap:"6px" }}>
        <div style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"12px", padding:"14px 16px", marginBottom:"2px" }}>
          <div style={{ color:SLA, fontWeight:700, fontSize:"13px" }}>Pengaturan</div>
          <div style={{ color:MUT, fontSize:"10px", marginTop:"2px" }}>Konfigurasi sistem HR</div>
        </div>
        {MENUS.map(m=>{
          const isActive = active===m.id;
          return (
            <div key={m.id} onClick={()=>setActive(m.id)}
              style={{ background:isActive?"rgba(99,102,241,0.08)":"#fff", border:isActive?`1px solid rgba(99,102,241,0.25)`:`1px solid ${BOR}`, borderLeft:isActive?`3px solid ${IND}`:"3px solid transparent", borderRadius:"10px", padding:"11px 13px", cursor:"pointer", transition:"all 0.15s" }}
              onMouseEnter={e=>{ if(!isActive){ e.currentTarget.style.background="rgba(99,102,241,0.04)"; }}}
              onMouseLeave={e=>{ if(!isActive){ e.currentTarget.style.background="#fff"; }}}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <span style={{ fontSize:"15px" }}>{m.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                    <span style={{ color:isActive?IND:SLA, fontWeight:isActive?700:500, fontSize:"12px" }}>{m.label}</span>
                    {m.demo && <span style={{ color:IND, background:"rgba(99,102,241,0.1)", border:`1px solid rgba(99,102,241,0.2)`, padding:"1px 5px", fontSize:"8px", fontWeight:700, borderRadius:"4px" }}>DEMO</span>}
                  </div>
                  <div style={{ color:MUT, fontSize:"10px", marginTop:"1px" }}>{m.desc}</div>
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ marginTop:"auto" }}>
          <div style={{ background:"#fff", border:"1px solid rgba(244,63,94,0.2)", borderRadius:"10px", padding:"12px 13px" }}>
            <div style={{ color:ROS, fontSize:"11px", fontWeight:700, marginBottom:"8px" }}>⚠ Zona Berbahaya</div>
            <button style={{ width:"100%", color:ROS, background:"rgba(244,63,94,0.06)", border:"1px solid rgba(244,63,94,0.2)", borderRadius:"8px", padding:"7px", fontSize:"11px", fontWeight:600, cursor:"pointer" }}>
              Reset Data
            </button>
          </div>
        </div>
      </div>

      {/* Right content */}
      <div style={{ flex:1, background:"#fff", border:`1px solid ${BOR}`, borderRadius:"14px", padding:"24px 28px", overflowY:"auto" }}>
        {activeMenu?.demo ? (
          <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"14px", textAlign:"center" }}>
            <div style={{ width:"60px", height:"60px", borderRadius:"50%", background:`rgba(99,102,241,0.1)`, border:`2px solid rgba(99,102,241,0.25)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"26px" }}>🔒</div>
            <div>
              <div style={{ color:IND, fontWeight:700, fontSize:"16px", marginBottom:"6px" }}>{activeMenu.label}</div>
              <div style={{ color:MUT, fontSize:"12px", lineHeight:1.7 }}>
                Fitur ini hanya tersedia di <span style={{ color:IND, fontWeight:700 }}>versi premium</span>.
              </div>
            </div>
            <span style={{ color:IND, background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.2)", padding:"6px 16px", borderRadius:"20px", fontSize:"11px", fontWeight:700 }}>
              ✦ PREMIUM
            </span>
          </div>
        ) : (sections[active] || <div style={{ color:MUT }}>Pilih menu</div>)}
      </div>
    </div>
  );
}
