import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../contexts/auth.context";

function PrivateRoute({children}) {
    const {isAuthenticated} = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate replace to="/auth" />;
    }

    return children;
}

export default PrivateRoute;
