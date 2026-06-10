"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import Header  from "@/components/Header";

const ViewLoader = () => (
  <div style={{ display:"flex", height:"calc(100vh - 128px)", alignItems:"center", justifyContent:"center" }}>
    <div style={{ textAlign:"center" }}>
      <div style={{ width:"32px", height:"32px", border:"2px solid rgba(99,102,241,0.15)", borderTop:"2px solid #6366f1", borderRadius:"50%", animation:"spin 0.7s linear infinite", margin:"0 auto 10px" }}/>
      <div style={{ color:"rgba(99,102,241,0.4)", fontSize:"11px", letterSpacing:"0.1em" }}>MEMUAT</div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  </div>
);

const DashboardView  = dynamic(()=>import("@/components/views/DashboardView"),  { loading:()=><ViewLoader/>, ssr:false });
const KaryawanView   = dynamic(()=>import("@/components/views/KaryawanView"),   { loading:()=><ViewLoader/>, ssr:false });
const AbsensiView    = dynamic(()=>import("@/components/views/AbsensiView"),    { loading:()=><ViewLoader/>, ssr:false });
const PenggajianView = dynamic(()=>import("@/components/views/PenggajianView"), { loading:()=><ViewLoader/>, ssr:false });
const CutiView       = dynamic(()=>import("@/components/views/CutiView"),       { loading:()=><ViewLoader/>, ssr:false });
const PengaturanView = dynamic(()=>import("@/components/views/PengaturanView"), { loading:()=><ViewLoader/>, ssr:false });

export default function Home() {
  const [active, setActive] = useState("dashboard");
  const views = {
    dashboard:  <DashboardView />,
    karyawan:   <KaryawanView />,
    absensi:    <AbsensiView />,
    penggajian: <PenggajianView />,
    cuti:       <CutiView />,
    pengaturan: <PengaturanView />,
  };
  return (
    <div className="flex h-screen overflow-hidden" style={{ background:"#f1f5f9" }}>
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header active={active} />
        <main className="flex-1 overflow-y-auto p-6">{views[active]}</main>
      </div>
    </div>
  );
}
