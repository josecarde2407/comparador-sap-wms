/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";
import { useComparisonContext } from "@/modules/context/ComparisonContext";
import ComparisonTable from "@/modules/dashboard/components/ComparisonTable/ComparisonTable";
import {
    exportToCSV,
} from "@/services/exportUtils";

import "./ComparisonByLot.css";

export default function ComparisonByLot() {

    const { data, loading } = useComparisonContext();

    const [estadoFilter, setEstadoFilter] = useState("TODOS");
    const [subfamiliaFilter, setSubfamiliaFilter] = useState("TODOS");
    const [search, setSearch] = useState("");

    const byLot = data?.byLot || [];

    /**
     * OPTIONS
     */
    const estados = [
        "TODOS",
        "OK",
        "DIFERENCIA",
        "SOLO_SAP",
        "SOLO_WMS",
    ];

    const subfamilias = useMemo(() => {

        const unique = [
            ...new Set(
                byLot.map((item) => item.sub_familia)
            ),
        ];

        return ["TODOS", ...unique.sort()];

    }, [byLot]);

    /**
     * FILTERED DATA
     */
    const filteredData = useMemo(() => {

        return byLot.filter((item) => {

            const matchEstado =
                estadoFilter === "TODOS"
                    ? true
                    : item.estado === estadoFilter;

            const matchSubfamilia =
                subfamiliaFilter === "TODOS"
                    ? true
                    : item.sub_familia === subfamiliaFilter;

            const searchText = search.toLowerCase();

            const matchSearch =
                !search
                || item.codigo?.toLowerCase().includes(searchText)
                || item.descripcion?.toLowerCase().includes(searchText)
                || item.loteSMA?.toLowerCase().includes(searchText);

            return (
                matchEstado
                && matchSubfamilia
                && matchSearch
            );

        });

    }, [
        byLot,
        estadoFilter,
        subfamiliaFilter,
        search,
    ]);

    /**
     * EXPORT
     */
    const handleExport = (format) => {

        const timestamp =
            new Date().toISOString().split("T")[0];

        if (format === "csv") {

            exportToCSV(
                filteredData,
                `comparacion-lote-${timestamp}.csv`
            );

        }
    };

    return (
        <div className="comparison-page">

            <div className="page-header">

                <h1>
                    📦 Comparación por Lote
                </h1>

                <p>
                    Análisis detallado de diferencias por número de lote
                </p>

            </div>

            {loading && (

                <div className="loading-state">

                    <div className="spinner"></div>

                    <p>
                        Procesando archivos...
                    </p>

                </div>

            )}

            {!data && !loading && (

                <div className="empty-state">

                    <div className="empty-icon">
                        📁
                    </div>

                    <h2>
                        Sin datos
                    </h2>

                    <p>
                        Carga archivos en el Dashboard para ver la comparación por lote
                    </p>

                </div>

            )}

            {data?.byLot && (

                <>

                    {/* FILTERS */}
                    <div className="filters-container">

                        <div className="filter-group">

                            <label>
                                Estado
                            </label>

                            <select
                                value={estadoFilter}
                                onChange={(e) =>
                                    setEstadoFilter(e.target.value)
                                }
                            >
                                {estados.map((estado) => (
                                    <option
                                        key={estado}
                                        value={estado}
                                    >
                                        {estado}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <div className="filter-group">

                            <label>
                                Subfamilia
                            </label>

                            <select
                                value={subfamiliaFilter}
                                onChange={(e) =>
                                    setSubfamiliaFilter(e.target.value)
                                }
                            >
                                {subfamilias.map((sub) => (
                                    <option
                                        key={sub}
                                        value={sub}
                                    >
                                        {sub}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <div className="filter-group search">

                            <label>
                                Buscar
                            </label>

                            <input
                                type="text"
                                placeholder="Código, descripción o lote..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>

                        <button
                            className="btn-clear-filters"
                            onClick={() => {
                                setEstadoFilter("TODOS");
                                setSubfamiliaFilter("TODOS");
                                setSearch("");
                            }}
                        >
                            Limpiar filtros
                        </button>

                    </div>

                    {/* EXPORT */}
                    <div className="export-controls">

                        <button
                            className="btn-export csv"
                            onClick={() => handleExport("csv")}
                        >
                            📥 Exportar CSV
                        </button>

                    </div>

                    {/* TOTAL */}
                    <div className="results-counter">

                        Mostrando
                        {" "}
                        <strong>
                            {filteredData.length}
                        </strong>
                        {" "}
                        registros

                    </div>

                    {/* TABLE */}
                    <ComparisonTable
                        data={filteredData}
                        title="Resultados por Lote"
                        showLots={true}
                    />

                </>

            )}

        </div>
    );
}