const IND = "#6366f1";
const MUT = "#64748b";
const SLA = "#1e293b";
const BOR = "#e2e8f0";

const LABELS = {
  dashboard:"Dashboard", karyawan:"Manajemen Karyawan",
  absensi:"Absensi & Kehadiran", penggajian:"Penggajian",
  cuti:"Manajemen Cuti", pengaturan:"Pengaturan",
};

export default function Header({ active }) {
  return (
    <header className="flex items-center justify-between px-6 flex-shrink-0"
      style={{ height:"64px", background:"#fff", borderBottom:`1px solid ${BOR}` }}>
      <div>
        <h1 className="font-bold text-base" style={{ color:SLA }}>{LABELS[active]}</h1>
        <p className="text-xs" style={{ color:MUT }}>
          <span style={{ color:IND }}>●</span>&nbsp; Sistem aktif · Jun 2026
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs" style={{ color:MUT }}>⌕</span>
          <input placeholder="Cari karyawan..." className="pl-8 pr-4 py-2 text-xs outline-none w-44 rounded-lg transition-all"
            style={{ background:"#f8fafc", border:`1px solid ${BOR}`, color:SLA }}
            onFocus={e=>{ e.target.style.borderColor=IND; e.target.style.boxShadow=`0 0 0 3px rgba(99,102,241,0.1)`; }}
            onBlur={e =>{ e.target.style.borderColor=BOR; e.target.style.boxShadow="none"; }} />
        </div>
        <div className="relative w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer" style={{ background:"#f8fafc", border:`1px solid ${BOR}` }}>
          <span style={{ fontSize:"15px" }}>🔔</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-white font-black rounded-full" style={{ background:IND, fontSize:"9px" }}>2</span>
        </div>
        <div style={{ width:"1px", height:"24px", background:BOR }}/>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background:`linear-gradient(135deg,${IND},#8b5cf6)` }}>HR</div>
          <div className="hidden sm:block">
            <div className="text-xs font-semibold" style={{ color:SLA }}>HR Manager</div>
            <div style={{ fontSize:"10px", color:MUT }}>Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}
