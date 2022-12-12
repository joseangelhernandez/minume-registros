import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "App";
import { AuthProvider } from "context/AuthProvider";

// Soft UI Context Provider
import { SoftUIControllerProvider } from "context";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
    <SoftUIControllerProvider>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App/>} />
        </Routes>
      </AuthProvider>
    </SoftUIControllerProvider>
  </BrowserRouter>
);
