import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { isAuthenticatedSelector } from "../../../store/auth/auth.selector";

const PrivateRoutes = () => {
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    
    return (
        isAuthenticated
            ? <Outlet />
            : <Navigate to="sign-in" />
    );
};

export default PrivateRoutes;
