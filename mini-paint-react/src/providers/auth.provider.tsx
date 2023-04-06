import React, { useEffect, useState } from "react";
import AuthContext from "../contexts/auth.context";
import User from "../models/user.model";
import AuthService from "../services/auth.service";

interface IAuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider = (props: IAuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        setCurrentUser(currentUser);
    }, []);

    return (
        <AuthContext.Provider value={{ authUser: currentUser, isAuthenticated: !!currentUser, setAuthUser: setCurrentUser }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
