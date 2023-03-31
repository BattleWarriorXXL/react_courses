import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../../../contexts/auth.context";

const PrivateRoutes = () => {
    const authContext = useContext(AuthContext);

    return (
        authContext.user
            ? <Outlet />
            : <Navigate to="auth/sign-in" />
    );
};

export default PrivateRoutes;
