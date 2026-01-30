import React from "react";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedTypes, children }) => {
    const { user, loading, isAuthenticated } = useAuth();

    // still checking auth state
    if (loading) {
        return (
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    // not logged in
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    // role not allowed
    if (
        allowedTypes &&
        Array.isArray(allowedTypes) &&
        !allowedTypes.includes(user.userType)
    ) {
        return <Navigate to="/unauthorized" replace />;
    }

    // allowed
    return children;
};

export default ProtectedRoute;
