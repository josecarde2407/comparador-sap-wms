import { formatStock, formatDifference } from "@/shared/utils/numberFormat";
import "./ComparisonTable.css";

export default function ComparisonTable({
  data,
  title,
  showLots = false,
}) {

  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar</p>;
  }

  return (
    <div className="comparison-table-container">

      <div className="table-header">
        <h2>{title}</h2>

        <span className="table-count">
          {data.length} registros
        </span>
      </div>

      <div className="table-wrapper">

        <table className="comparison-table">

          <thead>
            <tr>

              <th>Código</th>

              <th>Descripción</th>

              <th>Familia</th>

              <th>Subfamilia</th>

              {/* SOLO EN COMPARACIÓN POR LOTE */}
              {showLots && (
                <>
                  <th>Lote SMA</th>
                  <th>Lote Proveedor</th>
                </>
              )}

              <th>SAP</th>

              <th>WMS</th>

              <th>Diferencia</th>

              <th>Estado</th>

            </tr>
          </thead>

          <tbody>

            {data.map((item, idx) => (

              <tr
                key={idx}
                className={`estado-${item.estado.toLowerCase()}`}
              >

                <td className="code-cell">
                  {item.codigo}
                </td>

                <td className="desc-cell">
                  {item.descripcion}
                </td>

                <td>
                  {item.familia}
                </td>

                <td>
                  {item.sub_familia}
                </td>

                {/* SOLO EN COMPARACIÓN POR LOTE */}
                {showLots && (
                  <>
                    <td>
                      {item.loteSMA || "-"}
                    </td>

                    <td>
                      {item.loteProveedor || "-"}
                    </td>
                  </>
                )}

                <td className="sap-cell">
                  {formatStock(item.sap)}
                </td>

                <td className="wms-cell">
                  {formatStock(item.wms)}
                </td>

                <td className="diff-cell">

                  <span
                    className={
                      item.diferencia > 0
                        ? "positive"
                        : item.diferencia < 0
                          ? "negative"
                          : ""
                    }
                  >
                    {formatDifference(item.diferencia)}
                  </span>

                </td>

                <td>

                  <span
                    className={`status status-${item.estado
                      .toLowerCase()
                      .replace(/_/g, "-")}`}
                  >
                    {getStatusIcon(item.estado)}{" "}
                    {item.estado.replace(/_/g, " ")}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

function getStatusIcon(estado) {

  switch (estado) {

    case "OK":
      return "✅";

    case "DIFERENCIA":
      return "⚠️";

    case "SOLO_SAP":
      return "🔺";

    case "SOLO_WMS":
      return "🔻";

    default:
      return "❓";
  }
}