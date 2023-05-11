import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { isAuthenticatedSelector } from "../../../store/auth/auth.selector";

const AuthorizationRoutes = () => {
    const isAuthenticated = useSelector(isAuthenticatedSelector);

    return (
        isAuthenticated
            ? <Navigate to={"images"} />
            : <Outlet />
    );
};

export default AuthorizationRoutes;
