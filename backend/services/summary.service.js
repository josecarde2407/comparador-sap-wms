const buildSummary = (data) => {
  if (!Array.isArray(data)) return {
    total: 0,
    ok: 0,
    diferencias: 0,
    soloSap: 0,
    soloWms: 0,
  };

  return {
    total: data.length,
    ok: data.filter(x => x.estado === "OK").length,
    diferencias: data.filter(x => x.estado === "DIFERENCIA").length,
    soloSap: data.filter(x => x.estado === "SOLO_SAP").length,
    soloWms: data.filter(x => x.estado === "SOLO_WMS").length,
  };
};

const buildAnalytics = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      subfamilias: [],
      topDiferencias: [],
      topSoloSap: [],
      topSoloWms: [],
    };
  }

  // Subfamilias únicas
  const subfamilias = [...new Set(data.map(x => x.sub_familia))].sort();

  // Top 10 diferencias (ordenadas por valor absoluto)
  const topDiferencias = data
    .filter(x => x.estado === "DIFERENCIA")
    .sort((a, b) => Math.abs(b.diferencia) - Math.abs(a.diferencia))
    .slice(0, 10)
    .map(x => ({
      codigo: x.codigo,
      descripcion: x.descripcion,
      sub_familia: x.sub_familia,
      sap: x.sap,
      wms: x.wms,
      diferencia: x.diferencia,
    }));

  // Top 10 solo SAP
  const topSoloSap = data
    .filter(x => x.estado === "SOLO_SAP")
    .sort((a, b) => b.sap - a.sap)
    .slice(0, 10)
    .map(x => ({
      codigo: x.codigo,
      descripcion: x.descripcion,
      sub_familia: x.sub_familia,
      stock: x.sap,
    }));

  // Top 10 solo WMS
  const topSoloWms = data
    .filter(x => x.estado === "SOLO_WMS")
    .sort((a, b) => b.wms - a.wms)
    .slice(0, 10)
    .map(x => ({
      codigo: x.codigo,
      descripcion: x.descripcion,
      sub_familia: x.sub_familia,
      stock: x.wms,
    }));

  return {
    subfamilias,
    topDiferencias,
    topSoloSap,
    topSoloWms,
  };
};

module.exports = { buildSummary, buildAnalytics };