import { httpClient } from "./httpClient";

export const compareFiles = async (formData) => {
  const { data } = await httpClient.post("/compare", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};