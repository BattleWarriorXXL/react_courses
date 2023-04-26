import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../../store/store";

const PrivateRoutes = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    console.log(isAuthenticated);
    return (
        isAuthenticated
            ? <Outlet />
            : <Navigate to="sign-in" />
    );
};

export default PrivateRoutes;
