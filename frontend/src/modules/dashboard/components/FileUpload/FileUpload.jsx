import { useState } from "react";
import { useComparisonContext } from "../../../context/ComparisonContext";
import "./FileUpload.css";

export default function FileUpload() {

  const {
    uploadFiles,
    loading,
    clearData,
    data,
  } = useComparisonContext();

  const [error, setError] = useState("");

  const [sapFile, setSapFile] = useState(null);
  const [wmsFile, setWmsFile] = useState(null);

  const bothFilesSelected = sapFile && wmsFile;

  // SI YA EXISTE DATA NO PERMITIR CAMBIAR ARCHIVOS
  const filesLocked = !!data;

  const handleUpload = async () => {

    setError("");

    if (!sapFile || !wmsFile) {

      setError(
        "Por favor carga ambos archivos"
      );

      return;
    }

    try {

      await uploadFiles({
        sapFile,
        wmsFile,
      });

    } catch (err) {

      setError(
        err.message || "Error al procesar archivos"
      );
    }
  };

  const handleClear = () => {

    setSapFile(null);

    setWmsFile(null);

    setError("");

    clearData();
  };

  const handleBlockedUpload = () => {

    setError(
      "Debes limpiar la comparación actual antes de cargar nuevos archivos"
    );
  };

  return (

    <div className="file-upload-section">

      {/* LOADING */}
      {loading && (

        <div className="upload-loading-overlay">

          <div className="upload-loading-box">

            <div className="spinner-large"></div>

            <h3>
              Procesando archivos...
            </h3>

            <p>
              Comparando información SAP vs WMS
            </p>

            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>

          </div>

        </div>

      )}

      {/* TITLE */}
      <div className="upload-title">

        <h3>
          📤 Cargar Archivos para Comparar
        </h3>

        <p>
          Selecciona archivos Excel SAP y WMS
        </p>

      </div>

      {/* ALERTA */}
      {filesLocked && (

        <div className="upload-warning">

          ⚠ Ya existe una comparación cargada.
          Debes limpiar antes de cargar nuevos archivos.

        </div>

      )}

      <div className="upload-inputs-row">

        {/* SAP */}
        <div className="file-input-wrapper">

          <label
            className={`file-label-enhanced ${filesLocked ? "disabled" : ""}`}
          >

            <input
              type="file"
              accept=".xlsx,.xls"
              disabled={loading || filesLocked}
              className="file-input-hidden"
              onChange={(e) =>
                setSapFile(e.target.files[0])
              }
            />

            <div
              className={`file-button-box ${sapFile ? "loaded" : ""}`}
              onClick={(e) => {

                if (filesLocked) {

                  e.preventDefault();

                  handleBlockedUpload();
                }
              }}
            >

              <span className="file-emoji">
                📊
              </span>

              <div className="file-info">

                <span className="file-label-text">
                  Archivo SAP
                </span>

                {sapFile ? (

                  <span className="file-name">
                    {sapFile.name}
                  </span>

                ) : (

                  <span className="file-placeholder">
                    Haz clic para cargar
                  </span>

                )}

              </div>

              {sapFile && (
                <span className="file-badge">
                  ✓
                </span>
              )}

            </div>

          </label>

        </div>

        {/* DIVIDER */}
        <div className="divider-circle">
          vs
        </div>

        {/* WMS */}
        <div className="file-input-wrapper">

          <label
            className={`file-label-enhanced ${filesLocked ? "disabled" : ""}`}
          >

            <input
              type="file"
              accept=".xlsx,.xls"
              disabled={loading || filesLocked}
              className="file-input-hidden"
              onChange={(e) =>
                setWmsFile(e.target.files[0])
              }
            />

            <div
              className={`file-button-box ${wmsFile ? "loaded" : ""}`}
              onClick={(e) => {

                if (filesLocked) {

                  e.preventDefault();

                  handleBlockedUpload();
                }
              }}
            >

              <span className="file-emoji">
                📦
              </span>

              <div className="file-info">

                <span className="file-label-text">
                  Archivo WMS
                </span>

                {wmsFile ? (

                  <span className="file-name">
                    {wmsFile.name}
                  </span>

                ) : (

                  <span className="file-placeholder">
                    Haz clic para cargar
                  </span>

                )}

              </div>

              {wmsFile && (
                <span className="file-badge">
                  ✓
                </span>
              )}

            </div>

          </label>

        </div>

      </div>

      {/* ACTIONS */}
      <div className="upload-actions">

        <button
          onClick={handleUpload}
          disabled={
            loading ||
            !bothFilesSelected ||
            filesLocked
          }
          className="btn-compare-action"
        >

          🚀 Iniciar Comparación

        </button>

        <button
          onClick={handleClear}
          disabled={loading}
          className="btn-clear-action"
        >

          🗑 Limpiar

        </button>

      </div>

      {/* STATUS */}
      <div className="file-upload-status">

        <div
          className={`status-indicator ${sapFile ? "completed" : "pending"}`}
        >

          <span className="status-dot"></span>

          SAP {sapFile ? "✓ Cargado" : "○ Pendiente"}

        </div>

        <div
          className={`status-indicator ${wmsFile ? "completed" : "pending"}`}
        >

          <span className="status-dot"></span>

          WMS {wmsFile ? "✓ Cargado" : "○ Pendiente"}

        </div>

        {bothFilesSelected && !filesLocked && (

          <div className="status-ready">

            ✓ Archivos listos

          </div>

        )}

        {filesLocked && (

          <div className="status-locked">

            🔒 Comparación activa

          </div>

        )}

      </div>

      {error && (

        <div className="error-compact">
          {error}
        </div>

      )}

    </div>
  );
}