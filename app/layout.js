import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "CoderaftHR — Sistem Manajemen SDM Modern",
  description: "Platform HR terpadu untuk manajemen karyawan, absensi, penggajian, dan pengembangan SDM.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={geist.className}>
      <body>{children}</body>
    </html>
  );
}
