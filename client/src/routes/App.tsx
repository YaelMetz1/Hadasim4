import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage/HomePage";
import PatientsPage from "../pages/patientsPage/PatientsPage";
import SummaryPage from "../pages/summaryPage/SummaryPage";


export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Patients" element={<PatientsPage />} />
            <Route path="/Summary" element={<SummaryPage />} />
        </Routes>
    </BrowserRouter>
  );
}
