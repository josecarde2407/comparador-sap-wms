const VALID_SEDES = new Set([
  "LURIN",
  "LURIN 4",
]);

const VALID_FAMILIAS = new Set([
  "MATERIA PRIMA",
  "ENVASES Y EMPAQUES",
  "GRANELES",
  "EMPAQUE SEMIELABORADOS",
]);

const VALID_UN = new Set([
  "SMAFOOD",
]);

const normalize = (v) =>
  String(v || "")
    .trim()
    .toUpperCase();

const filterSapData = (data) => {
  return data.filter((item) => {
    const sede = normalize(item.sede);
    const familia = normalize(item.familia);
    const un = normalize(item.un);

    // Filtrar por sede Y familia Y UN
    const isValidSede = VALID_SEDES.has(sede);
    const isValidFamilia = VALID_FAMILIAS.has(familia);
    const isValidUN = VALID_UN.has(un);

    return isValidSede && isValidFamilia && isValidUN;
  });
};

module.exports = {
  filterSapData,
};