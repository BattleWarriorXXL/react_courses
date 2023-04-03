import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../../../contexts/auth.context";

const PrivateRoutes = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        isAuthenticated
            ? <Outlet />
            : <Navigate to="sign-in" />
    );
};

export default PrivateRoutes;
