"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DashboardView from "@/components/views/DashboardView";
import KaryawanView from "@/components/views/KaryawanView";
import AbsensiView from "@/components/views/AbsensiView";
import PlaceholderView from "@/components/views/PlaceholderView";

export default function Home() {
  const [active, setActive] = useState("dashboard");

  const renderView = () => {
    if (active === "dashboard") return <DashboardView />;
    if (active === "karyawan") return <KaryawanView />;
    if (active === "absensi") return <AbsensiView />;
    return <PlaceholderView label={active} />;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header active={active} />
        <main className="flex-1 overflow-y-auto p-6">{renderView()}</main>
      </div>
    </div>
  );
}
