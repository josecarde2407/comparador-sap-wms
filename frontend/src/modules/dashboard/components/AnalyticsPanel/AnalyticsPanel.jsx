import { formatStock, formatDifference } from "@/shared/utils/numberFormat";
import "./AnalyticsPanel.css";

export default function AnalyticsPanel({ analytics }) {
  if (!analytics) return null;

  return (
    <div className="analytics-container">
      {/* <section className="analytics-section">
        <h2 className="section-title">📋 Subfamilias Encontradas</h2>
        <div className="tag-container">
          {analytics.subfamilias?.map((sf, idx) => (
            <span key={idx} className="tag">
              {sf}
            </span>
          ))}
        </div>
      </section>*/}

      <section className="analytics-section">
        <h2 className="section-title">📊 Top 10 Diferencias Mayores</h2>
        <div className="analytics-table-wrapper">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Familia</th>
                <th>SAP</th>
                <th>WMS</th>
                <th>Diferencia</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topDiferencias?.map((item, idx) => (
                <tr key={idx} className="row-diferencia">
                  <td className="code">{item.codigo}</td>
                  <td className="desc">{item.descripcion}</td>
                  <td>{item.sub_familia}</td>
                  <td className="sap">{formatStock(item.sap)}</td>
                  <td className="wms">{formatStock(item.wms)}</td>
                  <td className="diff">{formatDifference(item.diferencia)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="analytics-grid">
        <section className="analytics-section">
          <h2 className="section-title">🔺 Top 10 Solo en SAP</h2>
          <div className="analytics-table-wrapper">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descripción</th>
                  <th>Familia</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {analytics.topSoloSap?.map((item, idx) => (
                  <tr key={idx} className="row-solo-sap">
                    <td className="code">{item.codigo}</td>
                    <td className="desc">{item.descripcion}</td>
                    <td>{item.sub_familia}</td>
                    <td className="stock">{formatStock(item.stock)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="analytics-section">
          <h2 className="section-title">🔻 Top 10 Solo en WMS</h2>
          <div className="analytics-table-wrapper">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descripción</th>
                  <th>Familia</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {analytics.topSoloWms?.map((item, idx) => (
                  <tr key={idx} className="row-solo-wms">
                    <td className="code">{item.codigo}</td>
                    <td className="desc">{item.descripcion}</td>
                    <td>{item.sub_familia}</td>
                    <td className="stock">{formatStock(item.stock)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
