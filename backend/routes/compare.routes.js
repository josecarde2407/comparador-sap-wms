const express = require("express");
const multer = require("multer");

const {
  compareInventory,
} = require("../controllers/compare.controller");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/compare",
  upload.fields([
    { name: "sapFile", maxCount: 1 },
    { name: "wmsFile", maxCount: 1 },
  ]),
  compareInventory
);

module.exports = router;