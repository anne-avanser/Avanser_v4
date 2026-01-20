// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "../src/routes/Approutes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
