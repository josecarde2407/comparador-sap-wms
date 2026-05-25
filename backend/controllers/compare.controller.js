const fs = require("fs");
const { readExcel } = require("../services/readExcel.service");

const {
  compareByCode,
  compareByLot,
} = require("../services/compare.service");

const { buildSummary, buildAnalytics } = require("../services/summary.service");

const compareInventory = async (req, res) => {
  try {
    const sapFile = req.files.sapFile[0];
    const wmsFile = req.files.wmsFile[0];

    const sapData = readExcel(sapFile.path);
    const wmsData = readExcel(wmsFile.path);

    const byCode = compareByCode(sapData, wmsData);
    const byLot = compareByLot(sapData, wmsData);

    const summary = buildSummary(Array.isArray(byLot) ? byLot : []);
    const analytics = buildAnalytics(Array.isArray(byLot) ? byLot : []);

    fs.unlinkSync(sapFile.path);
    fs.unlinkSync(wmsFile.path);

    return res.json({
      success: true,
      summary,
      analytics,
      byCode,
      byLot,
    });

  } catch (error) {
    console.error("ERROR DETALLADO:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  compareInventory,
};