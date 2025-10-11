import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm/RegisterForm";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/Register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}