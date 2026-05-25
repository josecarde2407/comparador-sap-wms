/**
 * Formatea números:
 * miles = coma
 * decimales = punto
 */

export const formatNumber = (value, withDecimals = true) => {
  if (value === null || value === undefined) return "0";

  const num = Number(value);

  if (isNaN(num)) return "0";

  return num.toLocaleString("en-US", {
    minimumFractionDigits: withDecimals ? 4 : 0,
    maximumFractionDigits: withDecimals ? 4 : 0,
  });
};

export const formatStock = (value) => formatNumber(value, true);

export const formatDifference = (value) => {
  const num = Number(value || 0);

  // evita mostrar -0.0000
  const normalized = Math.abs(num) < 0.0001 ? 0 : num;

  const formatted = formatNumber(normalized, true);

  return normalized > 0 ? `+${formatted}` : formatted;
};