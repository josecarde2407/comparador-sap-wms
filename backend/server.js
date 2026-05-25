const express = require("express");
const cors = require("cors");

const compareRoutes = require("./routes/compare.routes");
const cleanUploads = require("./utils/cleanUploads");

const app = express();

// CORS (mejorable para producción luego)
app.use(cors());

app.use(express.json());

app.use("/api", compareRoutes);

// Limpieza automática cada 30 min
setInterval(cleanUploads, 30 * 60 * 1000);

// IMPORTANTE: puerto dinámico para deploy
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
