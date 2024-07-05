import React from "react";
import ReactDOM from "react-dom/client";
import ApplicationRoutes from "./routes";
import "./App.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApplicationRoutes />
  </React.StrictMode>
);
