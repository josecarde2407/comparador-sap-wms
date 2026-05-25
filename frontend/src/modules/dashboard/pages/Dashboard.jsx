import { useComparisonContext } from "@/modules/context/ComparisonContext";
import FileUpload from "@/modules/dashboard/components/FileUpload/FileUpload";
import KpiCards from "@/modules/dashboard/components/KpiCards/KpiCards";
import AnalyticsPanel from "@/modules/dashboard/components/AnalyticsPanel/AnalyticsPanel";
import "@/modules/dashboard/styles/Dashboard.css";

export default function Dashboard() {
  const { data, loading } = useComparisonContext();

  const summary = data?.summary;
  const analytics = data?.analytics;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 Dashboard de Inventario</h1>
        <p className="subtitle">Compara y analiza datos SAP vs WMS en tiempo real</p>
      </div>

      <FileUpload />

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Procesando archivos...</p>
        </div>
      )}

      {!data && !loading && (
        <div className="empty-state">
          <div className="empty-icon">📁</div>
          <h2>Sin datos aún</h2>
          <p>Carga archivos SAP y WMS para comenzar el análisis</p>
        </div>
      )}

      {summary && (
        <>
          <KpiCards summary={summary} />
          {analytics && <AnalyticsPanel analytics={analytics} />}
        </>
      )}
    </div>
  );
}

