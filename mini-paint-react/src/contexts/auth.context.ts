import { createContext } from "react";
import User from "../types/user.type";

interface AuthContextType {
    authUser: User | null;
    setAuthUser: (user: User | null) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
    authUser: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setAuthUser: () => {},
    isAuthenticated: false
});

export default AuthContext;
