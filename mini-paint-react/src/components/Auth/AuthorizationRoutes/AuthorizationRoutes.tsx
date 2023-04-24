import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../../../contexts/auth.context";
import LocationService from "../../../services/location.service";

const AuthorizationRoutes = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        isAuthenticated
            ? <Navigate to={LocationService.getLastLocation()} />
            : <Outlet />
    );
};

export default AuthorizationRoutes;
