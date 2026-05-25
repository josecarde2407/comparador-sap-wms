export const exportToCSV = (data, filename = "data.csv") => {
  if (!data || data.length === 0) {
    alert("No hay datos para exportar");
    return;
  }

  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map(row =>
      headers
        .map(header => {
          const value = row[header];
          if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

export const exportToExcel = (data, filename = "data.xlsx") => {
  if (!data || data.length === 0) {
    alert("No hay datos para exportar");
    return;
  }

  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: "application/vnd.ms-excel;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

const convertToCSV = (data) => {
  if (!data || data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const csv = [
    headers.join("\t"),
    ...data.map(row =>
      headers.map(header => row[header] || "").join("\t")
    ),
  ].join("\n");

  return csv;
};
