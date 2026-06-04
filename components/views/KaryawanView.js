"use client";
import { useState } from "react";

const depts = ["Engineering", "Marketing", "Operasional", "Finance", "HR & Admin", "Sales"];
const statusOpts = ["Aktif", "Kontrak", "Probasi"];

const init = [
  { id: "EMP-001", nama: "Rini Handayani", jabatan: "Frontend Developer", dept: "Engineering", gaji: 12000000, status: "Aktif", masuk: "01 Jun 2026", avatar: "RH", color: "bg-emerald-500" },
  { id: "EMP-002", nama: "Budi Prasetyo", jabatan: "Digital Marketer", dept: "Marketing", gaji: 9000000, status: "Aktif", masuk: "28 Mei 2026", avatar: "BP", color: "bg-blue-500" },
  { id: "EMP-003", nama: "Sinta Maharani", jabatan: "Financial Analyst", dept: "Finance", gaji: 11000000, status: "Aktif", masuk: "25 Mei 2026", avatar: "SM", color: "bg-violet-500" },
  { id: "EMP-004", nama: "Fajar Nugroho", jabatan: "Sales Executive", dept: "Sales", gaji: 8500000, status: "Probasi", masuk: "20 Mei 2026", avatar: "FN", color: "bg-amber-500" },
  { id: "EMP-005", nama: "Dewi Kusuma", jabatan: "HR Generalist", dept: "HR & Admin", gaji: 8000000, status: "Aktif", masuk: "10 Mei 2026", avatar: "DK", color: "bg-pink-500" },
  { id: "EMP-006", nama: "Hendra Jaya", jabatan: "Backend Developer", dept: "Engineering", gaji: 14000000, status: "Kontrak", masuk: "01 Apr 2026", avatar: "HJ", color: "bg-indigo-500" },
];

const statusStyle = { Aktif: "bg-emerald-100 text-emerald-700", Kontrak: "bg-blue-100 text-blue-700", Probasi: "bg-amber-100 text-amber-700" };

const emptyForm = { nama: "", jabatan: "", dept: depts[0], gaji: "", status: statusOpts[0], masuk: "" };

export default function KaryawanView() {
  const [list, setList] = useState(init);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("Semua");
  const [modal, setModal] = useState(null); // null | "tambah" | {edit: karyawan}
  const [form, setForm] = useState(emptyForm);

  const filtered = list.filter((k) => {
    const s = k.nama.toLowerCase().includes(search.toLowerCase()) || k.jabatan.toLowerCase().includes(search.toLowerCase());
    const d = filterDept === "Semua" || k.dept === filterDept;
    return s && d;
  });

  const openTambah = () => { setForm(emptyForm); setModal("tambah"); };
  const openEdit = (k) => { setForm({ ...k }); setModal({ edit: k.id }); };

  const simpan = (e) => {
    e.preventDefault();
    if (modal === "tambah") {
      const colors = ["bg-emerald-500","bg-blue-500","bg-violet-500","bg-amber-500","bg-pink-500","bg-indigo-500"];
      setList([...list, { ...form, id: `EMP-00${list.length + 1}`, gaji: Number(form.gaji),
        avatar: form.nama.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
        color: colors[list.length % colors.length] }]);
    } else {
      setList(list.map((k) => k.id === modal.edit ? { ...k, ...form, gaji: Number(form.gaji) } : k));
    }
    setModal(null);
  };

  const hapus = (id) => setList(list.filter((k) => k.id !== id));

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-3 flex-wrap">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama / jabatan..."
            className="bg-slate-100 rounded-xl px-4 py-2 text-sm outline-none w-56 focus:ring-2 focus:ring-emerald-200" />
          <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}
            className="bg-slate-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200">
            <option>Semua</option>
            {depts.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <button onClick={openTambah}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
          + Tambah Karyawan
        </button>
      </div>

      {/* Cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((k) => (
          <div key={k.id} className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${k.color} rounded-xl flex items-center justify-center text-white font-bold`}>
                  {k.avatar}
                </div>
                <div>
                  <div className="font-bold text-slate-800">{k.nama}</div>
                  <div className="text-slate-400 text-xs">{k.jabatan}</div>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${statusStyle[k.status]}`}>{k.status}</span>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Departemen</span>
                <span className="text-slate-700 font-medium">{k.dept}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Gaji</span>
                <span className="text-slate-700 font-medium">Rp {k.gaji.toLocaleString("id")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Bergabung</span>
                <span className="text-slate-700 font-medium">{k.masuk}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ID</span>
                <span className="text-emerald-600 font-mono font-semibold text-xs">{k.id}</span>
              </div>
            </div>
            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => openEdit(k)}
                className="flex-1 text-xs bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-600 py-2 rounded-lg font-medium transition-all">Edit</button>
              <button onClick={() => hapus(k.id)}
                className="flex-1 text-xs bg-slate-100 hover:bg-red-500 hover:text-white text-slate-600 py-2 rounded-lg font-medium transition-all">Hapus</button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm text-slate-400 text-center">{filtered.length} dari {list.length} karyawan</div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-800 mb-6">{modal === "tambah" ? "Tambah Karyawan" : "Edit Karyawan"}</h3>
            <form onSubmit={simpan} className="space-y-4">
              {[
                { name: "nama", label: "Nama Lengkap", type: "text", placeholder: "Rini Handayani" },
                { name: "jabatan", label: "Jabatan", type: "text", placeholder: "Frontend Developer" },
                { name: "gaji", label: "Gaji (Rp)", type: "number", placeholder: "12000000" },
                { name: "masuk", label: "Tanggal Masuk", type: "date", placeholder: "" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-slate-600 mb-1">{f.label}</label>
                  <input required name={f.name} type={f.type} placeholder={f.placeholder} value={form[f.name]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
                </div>
              ))}
              {[
                { name: "dept", label: "Departemen", opts: depts },
                { name: "status", label: "Status", opts: statusOpts },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-slate-600 mb-1">{f.label}</label>
                  <select value={form[f.name]} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400">
                    {f.opts.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(null)}
                  className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors">Batal</button>
                <button type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-semibold transition-colors">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
