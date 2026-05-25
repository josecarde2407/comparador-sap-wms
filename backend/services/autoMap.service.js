const normalizeKey = (key) =>
  String(key)
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s.\-_]/g, "");

/**
 * 🚨 BLOQUEO DE HEADERS INVÁLIDOS
 * Evita que UM/UOM/UNIDAD sea detectado como código
 */
const INVALID_CODE_HEADERS = new Set([
  "um",
  "uom",
  "unidad",
  "unit",
  "un",
]);

const FIELD_RULES = {
  codigo: [
    "numeroarticulo",
    "numeroitem",
    "numarticulo",
    "codmaterial",
    "material",
    "matnr",
    "sku",
  ],

  descripcion: [
    "descripcion",
    "materialdescription",
    "itemdescription",
    "nombreitem",
  ],

  sub_familia: [
    "subfamilia",
    "subcategoria",
    "grupo",
    "linea",
  ],

  loteSMA: [
    "lotesma",
    "batch",
    "serial",
  ],

  lote: [
    "lote",
    "batch",
    "serial",
    "Lote Proveedor",
  ],

  stock: [
    "stock",
    "cantidad",
    "qty",
    "quantity",
    "existencia",
    "onhand",
  ],
};

/**
 * Scoring mejorado (con penalización fuerte)
 */
const scoreColumn = (columnName, candidates, field) => {
  const norm = normalizeKey(columnName);

  // ❌ bloqueo fuerte para código
  if (field === "codigo" && INVALID_CODE_HEADERS.has(norm)) {
    return -999;
  }

  let score = 0;

  for (const candidate of candidates) {
    const c = normalizeKey(candidate);

    if (norm === c) return 100;
    if (norm.includes(c) || c.includes(norm)) score += 40;
    if (norm.startsWith(c) || c.startsWith(norm)) score += 25;
    if (norm.endsWith(c) || c.endsWith(norm)) score += 15;
  }

  return score;
};

/**
 * Detecta mapping correcto
 */
const detectMapping = (data) => {
  const headers = Object.keys(data[0] || {});

  const mapping = {
    codigo: null,
    descripcion: null,
    sub_familia: null,
    loteSMA: null,
    lote: null,
    stock: null,
  };

  for (const field in FIELD_RULES) {
    let best = null;
    let bestScore = -999;

    for (const header of headers) {
      const score = scoreColumn(header, FIELD_RULES[field], field);

      if (score > bestScore) {
        bestScore = score;
        best = header;
      }
    }

    mapping[field] = best;
  }

  return mapping;
};

/**
 * Normalización usando mapping detectado
 */
const normalizeWithAutoMapping = (data, mapping) => {
  if (!Array.isArray(data)) return [];

  return data
    .filter(row => row && row[mapping?.codigo]) // 👈 FIX CRÍTICO
    .map((row) => {
      const codigo = row?.[mapping?.codigo];
      const descripcion = row?.[mapping?.descripcion];
      const subFamilia = row?.[mapping?.sub_familia];
      const loteSMA = row?.[mapping?.loteSMA];
      const lote = row?.[mapping?.lote];
      const stock = row?.[mapping?.stock];

      return {
        codigo: String(codigo || "").trim(),
        descripcion: String(descripcion || "").trim(),
        sub_familia: String(subFamilia || "").trim(),
        loteSMA: String(loteSMA || "").trim(),
        lote: String(lote || "").trim(),
        stock: Number(stock) || 0,
        sede: row?.[mapping?.sede]
          ? String(row[mapping.sede]).trim()
          : ""
      };
    })
    .filter(item => item.codigo !== "");
};

/**
 * Normaliza headers (debug helper)
 */
const normalizeHeaders = (data) => {
  return data.map((row) => {
    const normalized = {};

    Object.keys(row).forEach((key) => {
      const cleanKey = normalizeKey(key);
      normalized[cleanKey] = row[key];
    });

    return normalized;
  });
};

module.exports = {
  detectMapping,
  normalizeWithAutoMapping,
  normalizeHeaders,
};