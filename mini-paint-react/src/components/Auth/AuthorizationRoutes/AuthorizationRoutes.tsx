import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../../../contexts/auth.context";

const AuthorizationRoutes = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        isAuthenticated
            ? <Navigate to="/" />
            : <Outlet />
    );
};

export default AuthorizationRoutes;
