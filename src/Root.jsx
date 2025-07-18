import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Admin from "./components/Admin";
import "./index.css";

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<App adminMode={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Root;
