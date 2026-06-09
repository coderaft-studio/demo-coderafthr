export default function Loading() {
  return (
    <div style={{ display:"flex", height:"100vh", background:"#f1f5f9", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"16px" }}>
      <div style={{ width:"40px", height:"40px", border:"3px solid rgba(99,102,241,0.15)", borderTop:"3px solid #6366f1", borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>
      <div style={{ color:"rgba(99,102,241,0.6)", fontSize:"12px", fontWeight:700, letterSpacing:"0.1em" }}>MEMUAT...</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
