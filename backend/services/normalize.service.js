const normalizeData = (data) => {
  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    codigo: String(
      item["Número de artículo"] ||
      item.numero_item ||
      item.numeroItem ||
      item.codigo ||
      ""
    )
      .trim()
      .replace(/^0+/, "")
      .toUpperCase(),

    descripcion: String(
      item["Descripción de artículo"] ||
      item.nombre_item ||
      item.descripcion ||
      ""
    ).trim(),

    un: String(
      item.UN ||
      item.un ||
      ""
    ).trim().toUpperCase(),

    sede: String(
      item.Sede ||
      item.sede ||
      ""
    ).trim().toUpperCase(),

    familia: String(
      item.Familia ||
      item.familia ||
      ""
    ).trim().toUpperCase(),

    sub_familia: String(
      item.Subfamilia ||
      item.sub_familia ||
      item.subFamilia ||
      ""
    ).trim().toUpperCase(),

    loteSMA: String(
      item["Lote SMA"] ||
      item.LOTESMA ||
      item.loteSMA ||
      ""
    ).trim().toUpperCase(),

    loteProveedor: String(
      item["Lote Proveedor"] ||
      item.lote_proveedor ||
      item.loteProveedor ||
      item.numero_lote ||
      ""
    ).trim().toUpperCase(),

    stock:
      item.Cantidad ??
      item.cantidad_actual ??
      item.stock ??
      0,
  }));
};

module.exports = { normalizeData };