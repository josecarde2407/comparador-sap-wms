const { normalizeData } = require("./normalize.service");
const { filterSapData } = require("./sapFilter.service");

/**
 * Parse robusto de números con 4 decimales
 */
const parseNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  // si ya es number
  if (typeof value === "number") {
    return Number(value.toFixed(4));
  }

  // limpiar string
  const clean = String(value)
    .trim()
    .replace(/\s/g, "")
    .replace(",", ".");

  const parsed = parseFloat(clean);

  if (isNaN(parsed)) return 0;

  return Number(parsed.toFixed(4));
};

/**
 * Build Map
 */
const buildMap = (data, type) => {
  const map = new Map();

  (data || []).forEach((item) => {
    let key = "";

if (type === "CODE") {
  key = item.codigo;
}

if (type === "LOT") {
  key = [
    item.codigo || "NO_CODE",
    item.loteSMA || "NO_LOTE_SMA",
    item.loteProveedor || "NO_LOTE_PROV",
  ].join("_");
}

    const stock = parseNumber(item.stock);

    const current = map.get(key);

    if (!current) {
      map.set(key, {
        codigo: item.codigo,
        descripcion: item.descripcion || "",
        un: item.un || "SIN_UN",
        sede: item.sede || "SIN_SEDE",
        familia: item.familia || "SIN_FAMILIA",
        sub_familia: item.sub_familia || "SIN_SUBFAMILIA",
        loteSMA: item.loteSMA || null,
        loteProveedor: item.loteProveedor || null,
        stock,
      });
    } else {
      current.stock += stock;
    }
  });

  return map;
};

/**
 * CORE compare
 */
const compareData = (sap, wms, type) => {
  const sapNormalized = normalizeData(sap);
  const wmsNormalized = normalizeData(wms);

  const sapTagged = filterSapData(sapNormalized);

  const sapMap = buildMap(sapTagged, type);
  const wmsMap = buildMap(wmsNormalized, type);

  const allKeys = new Set([...sapMap.keys(), ...wmsMap.keys()]);

  const results = [];

  allKeys.forEach((key) => {
    const sapItem = sapMap.get(key);
    const wmsItem = wmsMap.get(key);

    const sapStock = sapItem?.stock || 0;
    const wmsStock = wmsItem?.stock || 0;

    const diff = Number((sapStock - wmsStock).toFixed(4));

    let estado = "OK";

    if (sapStock > 0 && wmsStock === 0) estado = "SOLO_SAP";
    else if (sapStock === 0 && wmsStock > 0) estado = "SOLO_WMS";
    else if (diff !== 0) estado = "DIFERENCIA";

    results.push({
      codigo: sapItem?.codigo || wmsItem?.codigo || key.split("_")[0],
      descripcion: sapItem?.descripcion || wmsItem?.descripcion || "",
      un: sapItem?.un || wmsItem?.un || "SIN_UN",
      sede: sapItem?.sede || wmsItem?.sede || "SIN_SEDE",
      familia: sapItem?.familia || wmsItem?.familia || "SIN_FAMILIA",
      sub_familia: sapItem?.sub_familia || wmsItem?.sub_familia || "SIN_SUBFAMILIA",

      loteSMA: sapItem?.loteSMA || wmsItem?.loteSMA || null,

      loteProveedor:
        sapItem?.loteProveedor ||
        wmsItem?.loteProveedor ||
        null,

      sap: sapStock,
      wms: wmsStock,
      diferencia: diff,
      estado,
      estado_subfamilia: sapItem?.isValidSubFamilia ? "VALIDA" : "NO_VALIDA",
    });
  });

  return results;
};

const compareByCode = (sap, wms) => compareData(sap, wms, "CODE");
const compareByLot = (sap, wms) => compareData(sap, wms, "LOT");

module.exports = {
  compareByCode,
  compareByLot,
};