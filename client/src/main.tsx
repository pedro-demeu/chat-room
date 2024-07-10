import React from "react";
import ReactDOM from "react-dom/client";
import ApplicationRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <ApplicationRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
      />
    </RecoilRoot>
  </React.StrictMode>
);
