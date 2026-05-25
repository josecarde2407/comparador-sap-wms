import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../modules/dashboard/pages/Dashboard";
import ComparisonByCode from "../modules/comparison/by-code/ComparisonByCode";
import ComparisonByLot from "../modules/comparison/by-lot/ComparisonByLot";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code" element={<ComparisonByCode />} />
          <Route path="/lot" element={<ComparisonByLot />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}