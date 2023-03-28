import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const isAuthentinicated = false;

    return (
        isAuthentinicated
            ? <Outlet />
            : <Navigate to="auth/sign-in" />
    );
};

export default PrivateRoutes;
