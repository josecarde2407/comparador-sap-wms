const express = require("express");
const cors = require("cors");

const compareRoutes = require("./routes/compare.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", compareRoutes);

const PORT = 3001;

const cleanUploads = require("./utils/cleanUploads");

// Ejecuta cada 30 minutos
setInterval(cleanUploads, 30* 60 * 1000);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});