import "./KpiCards.css";

export default function KpiCards({ summary }) {
  if (!summary) return null;

  const kpis = [
    {
      title: "Total Items",
      value: summary.total,
      icon: "📊",
      color: "primary",
    },
    {
      title: "Sincronizados",
      value: summary.ok,
      icon: "✅",
      color: "success",
    },
    {
      title: "Diferencias",
      value: summary.diferencias,
      icon: "⚠️",
      color: "warning",
    },
    {
      title: "Solo SAP",
      value: summary.soloSap,
      icon: "🔺",
      color: "info",
    },
    {
      title: "Solo WMS",
      value: summary.soloWms,
      icon: "🔻",
      color: "danger",
    },
  ];

  return (
    <div className="kpi-container">
      {kpis.map((kpi, idx) => (
        <div
          key={idx}
          className={`kpi-card kpi-${kpi.color}`}
          style={{ animation: `slideInUp 0.5s ease ${idx * 0.1}s both` }}
        >
          <div className="kpi-icon">{kpi.icon}</div>
          <div className="kpi-content">
            <h3 className="kpi-title">{kpi.title}</h3>
            <p className="kpi-value">{kpi.value}</p>
          </div>
          <div className="kpi-bg"></div>
        </div>
      ))}
    </div>
  );
}
