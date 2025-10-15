import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // ✅ thêm dòng này
import "react-toastify/dist/ReactToastify.css"; // ✅ import CSS cho toast

import LoginForm from "./components/Auth/LoginForm/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm/RegisterForm";
import ActiveForm from "./components/Auth/ActiveForm/ActiveForm"; // nếu có

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/active" element={<ActiveForm />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{
          borderRadius: "12px",
          background: "#fff",
          color: "#333",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          fontSize: "0.95rem",
          fontFamily: "Inter, sans-serif",
        }}
        bodyClassName="toastBody"
      />
    </Router>
  );
}
