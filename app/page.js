"use client";
import { useState } from "react";
import Sidebar      from "@/components/Sidebar";
import Header       from "@/components/Header";
import DashboardView  from "@/components/views/DashboardView";
import KaryawanView   from "@/components/views/KaryawanView";
import AbsensiView    from "@/components/views/AbsensiView";
import PenggajianView from "@/components/views/PenggajianView";
import CutiView       from "@/components/views/CutiView";
import PengaturanView from "@/components/views/PengaturanView";

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
