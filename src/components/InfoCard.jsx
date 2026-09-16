export default function InfoCard({ icon, title, value }) {
  return (
    <div className="info-card h-100">
      <div className="info-icon"><i className={`bi ${icon}`}></i></div>
      <div>
        <div className="small text-secondary">{title}</div>
        <div className="fw-semibold">{value || "—"}</div>
      </div>
    </div>
  );
}