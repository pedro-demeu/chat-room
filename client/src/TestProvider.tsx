import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";

export default function TestProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          {children}
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnFocusLoss
        />
      </RecoilRoot>
    </BrowserRouter>
  );
}
