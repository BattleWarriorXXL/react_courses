import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const AuthorizationRoutes = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
        isAuthenticated
            ? <Navigate to={"images"} />
            : <Outlet />
    );
};

export default AuthorizationRoutes;
