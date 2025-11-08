import React from "react";
import { Navigate } from "react-router-dom";
import { tokenService } from "../utils/tokenService"; 
const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = !!tokenService.getAccessToken();
    const userRole = localStorage.getItem('userRole');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;