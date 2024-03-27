import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage/HomePage";
import PatientsPage from "../pages/patientsPage/PatientsPage";


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PatientsPage />} />
            {/* <Route path="/Patients" element={<PatientsPage />} /> */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
