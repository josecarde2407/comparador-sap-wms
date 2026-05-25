import { createContext, useContext, useState } from "react";
import { compareFiles } from "@/services/compare.service";

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const uploadFiles = async (files) => {

    setLoading(true);

    setError(null);

    try {

      const formData = new FormData();

      formData.append("sapFile", files.sapFile);

      formData.append("wmsFile", files.wmsFile);

      const response = await compareFiles(formData);

      setData(response);

      return response;

    } catch (err) {

      setError(
        err.message || "Error al comparar archivos"
      );

      throw err;

    } finally {

      setLoading(false);
    }
  };

  const clearData = () => {

    setData(null);

    setError(null);
  };

  return (
    <ComparisonContext.Provider
      value={{
        data,
        loading,
        error,
        uploadFiles,
        clearData,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useComparisonContext = () =>
  useContext(ComparisonContext);