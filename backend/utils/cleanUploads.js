const fs = require("fs");
const path = require("path");

const UPLOAD_DIR = path.join(__dirname, "../uploads");

// Tiempo máximo en milisegundos (ej: 30 minutos)
const MAX_AGE = 30 * 60 * 1000;

function cleanUploads() {
    fs.readdir(UPLOAD_DIR, (err, files) => {
        if (err) {
            console.error("Error leyendo uploads:", err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(UPLOAD_DIR, file);

            fs.stat(filePath, (err, stats) => {
                if (err) return;

                const now = Date.now();
                const fileAge = now - stats.mtime.getTime();

                if (fileAge > MAX_AGE) {
                    fs.unlink(filePath, (err) => {
                        if (!err) {
                            console.log(`Archivo eliminado: ${file}`);
                        }
                    });
                }
            });
        });
    });
}

module.exports = cleanUploads;