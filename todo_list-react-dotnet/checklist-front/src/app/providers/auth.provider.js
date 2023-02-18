import React, { useEffect, useState } from "react";

import AuthForm from "../components/Auth/AuthControl/AuthForm";
import AuthService from "../services/auth.service";
import AuthContext from "../contexts/auth.context";

function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    
    useEffect(() => {
        const checkAuth = () => {
            let user = AuthService.getCurrentUser();
            setCurrentUser(user);
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated: !!currentUser, currentUser, setCurrentUser}}>
            { currentUser ? children : <AuthForm /> }
        </AuthContext.Provider>
    );
}

export default AuthProvider;
