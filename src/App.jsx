import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginForm from "./components/Auth/LoginForm/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm/RegisterForm";
import ActiveForm from "./components/Auth/ActiveForm/ActiveForm";
import Dashboard from "./admin/Dashboard";
import Movies from "./admin/Movies";
import Bookings from "./admin/Bookings";
import Users from "./admin/Users";
import Home from "./client/Home";
import MovieList from "./client/MovieList";
import Booking from "./client/Booking";

function getRoleFromToken() {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // Lấy đúng key 'roles' từ payload
    return payload.roles || payload.role;
  } catch {
    return null;
  }
}

function PrivateRoute({ children, role }) {
  const userRole = getRoleFromToken();
  if (!userRole) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/active" element={<ActiveForm />} />

        {/* Client routes */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/booking" element={<Booking />} />

        {/* Admin routes - protected */}
        <Route path="/admin/dashboard" element={
          <PrivateRoute role="ROLE_ADMIN">
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/admin/movies" element={
          <PrivateRoute role="ROLE_ADMIN">
            <Movies />
          </PrivateRoute>
        } />
        <Route path="/admin/bookings" element={
          <PrivateRoute role="ROLE_ADMIN">
            <Bookings />
          </PrivateRoute>
        } />
        <Route path="/admin/users" element={
          <PrivateRoute role="ROLE_ADMIN">
            <Users />
          </PrivateRoute>
        } />
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
