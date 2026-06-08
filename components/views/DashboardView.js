"use client";
import { useState } from "react";

const IND="#6366f1", VIO="#8b5cf6", EME="#10b981", AMB="#f59e0b", ROS="#f43f5e", SKY="#0ea5e9";
const SLA="#1e293b", MUT="#64748b", BOR="#e2e8f0", LIG="#f8fafc";

const STATS = [
  { label:"Total Karyawan",  val:"128", sub:"+4 bulan ini",    icon:"👥", from:IND,  to:VIO  },
  { label:"Hadir Hari Ini",  val:"112", sub:"87.5% kehadiran", icon:"✅", from:EME,  to:"#059669" },
  { label:"Cuti Aktif",      val:"8",   sub:"6 pending",        icon:"🌴", from:AMB,  to:"#d97706" },
  { label:"Kontrak Habis",   val:"3",   sub:"dalam 30 hari",   icon:"⚠",  from:ROS,  to:"#e11d48" },
];

const DEPTS = [
  { nama:"Engineering", n:32, color:IND  },
  { nama:"Marketing",   n:24, color:VIO  },
  { nama:"Operasional", n:28, color:SKY  },
  { nama:"Finance",     n:18, color:EME  },
  { nama:"HR & Admin",  n:14, color:AMB  },
  { nama:"Sales",       n:12, color:ROS  },
];

const ATTEND = [
  { label:"Hadir",      val:112, pct:87, color:EME },
  { label:"Terlambat",  val:6,   pct:5,  color:AMB },
  { label:"Izin/Sakit", val:6,   pct:5,  color:SKY },
  { label:"Alpha",      val:4,   pct:3,  color:ROS },
];

const NEW_EMP = [
  { nama:"Rini Handayani",  jabatan:"Frontend Dev",      dept:"Engineering", masuk:"01 Jun", av:"RH", c:IND },
  { nama:"Budi Prasetyo",   jabatan:"Digital Marketer",  dept:"Marketing",   masuk:"28 Mei", av:"BP", c:VIO },
  { nama:"Sinta Maharani",  jabatan:"Financial Analyst", dept:"Finance",     masuk:"25 Mei", av:"SM", c:EME },
  { nama:"Fajar Nugroho",   jabatan:"Sales Executive",   dept:"Sales",       masuk:"20 Mei", av:"FN", c:AMB },
];

const EVENTS = [
  { type:"🎂", text:"Ulang tahun Rini Handayani",        sub:"Hari ini",    color:"rgba(244,63,94,0.1)",   tc:ROS },
  { type:"🎉", text:"3 tahun Hendra Jaya",                sub:"Besok",       color:"rgba(99,102,241,0.1)",  tc:IND },
  { type:"📋", text:"Review kontrak Fajar Nugroho",       sub:"3 hari lagi", color:"rgba(245,158,11,0.1)",  tc:AMB },
  { type:"🌴", text:"Cuti Sinta Maharani berakhir",       sub:"5 hari lagi", color:"rgba(16,185,129,0.1)",  tc:EME },
];

// Headcount 6 months
const HEADCOUNT = [
  { bln:"Jan", n:120 }, { bln:"Feb", n:122 }, { bln:"Mar", n:121 },
  { bln:"Apr", n:124 }, { bln:"Mei", n:126 }, { bln:"Jun", n:128 },
];

// Kontrak habis
const KONTRAK_HABIS = [
  { nama:"Fajar Nugroho",  jabatan:"Sales Executive",   sisa:7,  av:"FN", c:AMB },
  { nama:"Dewi Kusuma",    jabatan:"HR Generalist",     sisa:18, av:"DK", c:ROS },
  { nama:"Hendra Jaya",    jabatan:"Backend Developer", sisa:26, av:"HJ", c:SKY },
];

// Top performers (attendance)
const TOP_PERFORMERS = [
  { nama:"Rini Handayani",  dept:"Engineering", pct:100, av:"RH", c:IND },
  { nama:"Ahmad Rizky",     dept:"Operasional", pct:98,  av:"AR", c:SKY },
  { nama:"Lina Santoso",    dept:"Marketing",   pct:96,  av:"LS", c:VIO },
];

// Quick actions
const QUICK_ACTIONS = [
  { icon:"👤", label:"Tambah Karyawan",  desc:"Daftarkan karyawan baru",      from:IND, to:VIO },
  { icon:"✅", label:"Approve Cuti",     desc:"2 pengajuan menunggu",          from:EME, to:"#059669" },
  { icon:"💰", label:"Proses Gaji",      desc:"3 belum diproses",              from:AMB, to:"#d97706" },
  { icon:"📊", label:"Lihat Laporan",    desc:"Statistik bulan ini",           from:SKY, to:"#0284c7" },
];

function Card({ children, style }) {
  return <div style={{ background:"#fff", border:`1px solid ${BOR}`, borderRadius:"16px", ...style }}>{children}</div>;
}

export default function DashboardView() {
  const [hovQA, setHovQA] = useState(null);

  return (
    <div className="space-y-4">

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(s=>(
          <div key={s.label} style={{ background:`linear-gradient(135deg,${s.from},${s.to})`, borderRadius:"16px", padding:"20px", color:"#fff", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:"-10px", right:"-10px", fontSize:"56px", opacity:0.12 }}>{s.icon}</div>
            <div style={{ fontSize:"28px", marginBottom:"4px" }}>{s.icon}</div>
            <div style={{ fontWeight:900, fontSize:"30px", lineHeight:1 }}>{s.val}</div>
            <div style={{ fontSize:"12px", opacity:0.85, marginTop:"4px" }}>{s.label}</div>
            <div style={{ fontSize:"10px", opacity:0.6, marginTop:"2px" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Quick Actions ── */}
      <div>
        <div style={{ color:MUT, fontSize:"11px", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"10px" }}>Aksi Cepat</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((qa,i)=>(
            <div key={qa.label}
              style={{ background: hovQA===i?`linear-gradient(135deg,${qa.from},${qa.to}`:"#fff", border:`1px solid ${BOR}`, borderRadius:"14px", padding:"16px", cursor:"pointer", transition:"all 0.2s", boxShadow:hovQA===i?"0 8px 24px rgba(0,0,0,0.12)":"none" }}
              onMouseEnter={()=>setHovQA(i)}
              onMouseLeave={()=>setHovQA(null)}>
              <div style={{ fontSize:"26px", marginBottom:"8px" }}>{qa.icon}</div>
              <div style={{ color:hovQA===i?"#fff":SLA, fontWeight:700, fontSize:"13px", marginBottom:"2px" }}>{qa.label}</div>
              <div style={{ color:hovQA===i?"rgba(255,255,255,0.7)":MUT, fontSize:"10px" }}>{qa.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dept Chart + Attendance ── */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card style={{ padding:"22px", gridColumn:"span 2" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"18px" }}>
            <div>
              <div style={{ color:SLA, fontWeight:700, fontSize:"14px" }}>Karyawan per Departemen</div>
              <div style={{ color:MUT, fontSize:"11px", marginTop:"2px" }}>128 karyawan aktif total</div>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            {DEPTS.map(d=>(
              <div key={d.nama}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"5px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                    <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:d.color }}/>
                    <span style={{ color:SLA, fontSize:"13px", fontWeight:500 }}>{d.nama}</span>
                  </div>
                  <span style={{ color:MUT, fontSize:"12px" }}>{d.n} orang</span>
                </div>
                <div style={{ height:"7px", background:LIG, borderRadius:"4px", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${(d.n/32)*100}%`, background:d.color, borderRadius:"4px" }}/>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Attendance donut */}
        <Card style={{ padding:"22px", display:"flex", flexDirection:"column", gap:"12px" }}>
          <div style={{ color:SLA, fontWeight:700, fontSize:"14px" }}>Kehadiran Hari Ini</div>
          {(()=>{
            let cum=0;
            const grad=ATTEND.map(a=>{ const s=cum; cum+=a.pct; return `${a.color} ${s}% ${cum}%`; }).join(", ");
            return (
              <div style={{ display:"flex", justifyContent:"center" }}>
                <div style={{ position:"relative", width:"120px", height:"120px" }}>
                  <div style={{ width:"120px", height:"120px", borderRadius:"50%", background:`conic-gradient(${grad})` }}/>
                  <div style={{ position:"absolute", inset:"22px", borderRadius:"50%", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column" }}>
                    <div style={{ color:EME, fontWeight:900, fontSize:"18px" }}>87%</div>
                    <div style={{ color:MUT, fontSize:"8px" }}>Hadir</div>
                  </div>
                </div>
              </div>
            );
          })()}
          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
            {ATTEND.map(a=>(
              <div key={a.label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                  <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:a.color }}/>
                  <span style={{ color:MUT, fontSize:"12px" }}>{a.label}</span>
                </div>
                <span style={{ color:SLA, fontWeight:700, fontSize:"13px" }}>{a.val}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Headcount Trend + Kontrak Habis + Top Performer ── */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Headcount trend */}
        <Card style={{ padding:"20px" }}>
          <div style={{ color:SLA, fontWeight:700, fontSize:"13px", marginBottom:"4px" }}>Pertumbuhan Headcount</div>
          <div style={{ color:MUT, fontSize:"10px", marginBottom:"16px" }}>6 bulan terakhir</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:"6px", height:"80px" }}>
            {HEADCOUNT.map((h,i)=>{
              const pct = ((h.n-118)/(128-118))*100;
              const isLast = i===HEADCOUNT.length-1;
              return (
                <div key={h.bln} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"5px" }}>
                  <div style={{ width:"100%", height:"60px", background:LIG, borderRadius:"6px", position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", bottom:0, left:0, right:0, height:`${Math.max(pct,10)}%`, background:isLast?`linear-gradient(to top,${IND},${VIO})`:`rgba(99,102,241,0.3)`, borderRadius:"4px", transition:"height 0.5s" }}/>
                    {isLast && <div style={{ position:"absolute", top:"4px", left:0, right:0, textAlign:"center", fontSize:"9px", fontWeight:700, color:IND }}>{h.n}</div>}
                  </div>
                  <span style={{ color:MUT, fontSize:"9px" }}>{h.bln}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop:"14px", paddingTop:"12px", borderTop:`1px solid ${BOR}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ color:MUT, fontSize:"11px" }}>Total saat ini</span>
            <span style={{ color:IND, fontWeight:900, fontSize:"16px" }}>128</span>
          </div>
        </Card>

        {/* Kontrak akan habis */}
        <Card style={{ padding:"20px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"14px" }}>
            <span style={{ fontSize:"16px" }}>⚠</span>
            <div style={{ color:SLA, fontWeight:700, fontSize:"13px" }}>Kontrak Akan Habis</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {KONTRAK_HABIS.map(k=>{
              const urgency = k.sisa <= 7 ? ROS : k.sisa <= 14 ? AMB : MUT;
              return (
                <div key={k.nama} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <div style={{ width:"34px", height:"34px", borderRadius:"50%", background:k.c, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"11px", flexShrink:0 }}>{k.av}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ color:SLA, fontWeight:600, fontSize:"12px" }}>{k.nama}</div>
                    <div style={{ color:MUT, fontSize:"10px" }}>{k.jabatan}</div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ color:urgency, fontWeight:700, fontSize:"12px" }}>{k.sisa} hari</div>
                    <div style={{ color:MUT, fontSize:"9px" }}>tersisa</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop:"12px", paddingTop:"10px", borderTop:`1px solid ${BOR}` }}>
            <button style={{ width:"100%", padding:"8px", border:`1px solid ${BOR}`, borderRadius:"8px", color:IND, background:"rgba(99,102,241,0.05)", fontSize:"11px", fontWeight:600, cursor:"pointer" }}>
              Lihat Semua Kontrak →
            </button>
          </div>
        </Card>

        {/* Top performers */}
        <Card style={{ padding:"20px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"14px" }}>
            <span style={{ fontSize:"16px" }}>🏆</span>
            <div style={{ color:SLA, fontWeight:700, fontSize:"13px" }}>Top Performer Bulan Ini</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            {TOP_PERFORMERS.map((p,i)=>(
              <div key={p.nama} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <div style={{ width:"22px", height:"22px", borderRadius:"50%", background:i===0?AMB:i===1?"#94a3b8":"#cd7f32", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:"10px", flexShrink:0 }}>
                  {i+1}
                </div>
                <div style={{ width:"34px", height:"34px", borderRadius:"50%", background:p.c, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"11px", flexShrink:0 }}>{p.av}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ color:SLA, fontWeight:600, fontSize:"12px" }}>{p.nama}</div>
                  <div style={{ color:MUT, fontSize:"10px" }}>{p.dept}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ color:EME, fontWeight:900, fontSize:"13px" }}>{p.pct}%</div>
                  <div style={{ color:MUT, fontSize:"9px" }}>hadir</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:"14px", padding:"10px 12px", background:`rgba(16,185,129,0.06)`, borderRadius:"10px", border:`1px solid rgba(16,185,129,0.15)`, textAlign:"center" }}>
            <span style={{ color:EME, fontSize:"11px", fontWeight:600 }}>Rata-rata kehadiran tim: <strong>91.2%</strong></span>
          </div>
        </Card>
      </div>

      {/* ── New Employees + Events ── */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <div style={{ padding:"16px 20px", borderBottom:`1px solid ${BOR}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ color:SLA, fontWeight:700, fontSize:"13px" }}>Karyawan Baru</div>
            <span style={{ color:IND, fontSize:"11px", fontWeight:700, cursor:"pointer" }}>Lihat Semua →</span>
          </div>
          <div>
            {NEW_EMP.map((k,i)=>(
              <div key={k.nama} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"12px 20px", borderBottom:i<NEW_EMP.length-1?`1px solid ${BOR}`:"none" }}>
                <div style={{ width:"38px", height:"38px", borderRadius:"50%", background:k.c, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"12px", flexShrink:0 }}>{k.av}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ color:SLA, fontWeight:600, fontSize:"13px" }}>{k.nama}</div>
                  <div style={{ color:MUT, fontSize:"11px" }}>{k.jabatan} · {k.dept}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ color:IND, fontWeight:700, fontSize:"11px", background:"rgba(99,102,241,0.08)", padding:"3px 8px", borderRadius:"6px" }}>Baru</div>
                  <div style={{ color:MUT, fontSize:"10px", marginTop:"2px" }}>{k.masuk}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ padding:"16px 20px", borderBottom:`1px solid ${BOR}` }}>
            <div style={{ color:SLA, fontWeight:700, fontSize:"13px" }}>Event Mendatang</div>
          </div>
          <div style={{ padding:"8px 16px" }}>
            {EVENTS.map((e,i)=>(
              <div key={i} style={{ display:"flex", gap:"12px", padding:"10px 4px", borderBottom:i<EVENTS.length-1?`1px solid ${BOR}`:"none", alignItems:"center" }}>
                <div style={{ width:"36px", height:"36px", borderRadius:"10px", background:e.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", flexShrink:0 }}>{e.type}</div>
                <div style={{ flex:1 }}>
                  <div style={{ color:SLA, fontSize:"12px", fontWeight:600 }}>{e.text}</div>
                  <div style={{ color:e.tc, fontSize:"10px", fontWeight:700, marginTop:"2px" }}>{e.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Pengumuman ── */}
      <Card style={{ padding:"20px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"14px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <span style={{ fontSize:"16px" }}>📢</span>
            <div style={{ color:SLA, fontWeight:700, fontSize:"13px" }}>Pengumuman Perusahaan</div>
          </div>
          <button style={{ color:IND, background:"rgba(99,102,241,0.08)", border:`1px solid rgba(99,102,241,0.2)`, borderRadius:"8px", padding:"6px 14px", fontSize:"11px", fontWeight:700, cursor:"pointer" }}>
            + Buat Pengumuman
          </button>
        </div>
        <div className="grid lg:grid-cols-3 gap-3">
          {[
            { judul:"Libur Idul Adha", isi:"Kantor libur 17-18 Juni 2026. Semua karyawan diliburkan.", tgl:"5 Jun", color:"rgba(99,102,241,0.08)", tc:IND, icon:"🎉" },
            { judul:"Review Kinerja Semester",isi:"Jadwal review kinerja semester 1 akan dilaksanakan 30 Juni 2026.",tgl:"3 Jun", color:"rgba(245,158,11,0.08)", tc:AMB, icon:"📋" },
            { judul:"Update Kebijakan Cuti",isi:"Kebijakan cuti tahunan diperbarui. Silakan baca dokumen HR terbaru.",tgl:"1 Jun", color:"rgba(16,185,129,0.08)", tc:EME, icon:"📄" },
          ].map(a=>(
            <div key={a.judul} style={{ background:a.color, border:`1px solid ${BOR}`, borderRadius:"12px", padding:"14px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"8px" }}>
                <span style={{ fontSize:"16px" }}>{a.icon}</span>
                <span style={{ color:a.tc, fontWeight:700, fontSize:"12px" }}>{a.judul}</span>
              </div>
              <p style={{ color:MUT, fontSize:"11px", lineHeight:1.6, margin:"0 0 8px" }}>{a.isi}</p>
              <span style={{ color:a.tc, fontSize:"10px", fontWeight:600 }}>{a.tgl}</span>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}
