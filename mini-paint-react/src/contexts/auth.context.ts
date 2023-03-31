import { createContext } from "react";
import User from "../models/user.model";

interface AuthContextType {
    user: User | null;
}

const AuthContext = createContext<AuthContextType>({
    user: null
});

export default AuthContext;
