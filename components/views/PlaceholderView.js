const icons = { penggajian: "💰", cuti: "🏖", pengaturan: "⚙️" };

export default function PlaceholderView({ label }) {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="text-6xl mb-4">{icons[label] || "📋"}</div>
        <h3 className="text-xl font-bold text-slate-700 mb-2 capitalize">{label}</h3>
        <p className="text-slate-400 text-sm max-w-xs">Fitur ini tersedia di versi lengkap. Hubungi kami untuk akses penuh.</p>
        <button className="mt-6 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors">
          Minta Demo Lengkap
        </button>
      </div>
    </div>
  );
}
