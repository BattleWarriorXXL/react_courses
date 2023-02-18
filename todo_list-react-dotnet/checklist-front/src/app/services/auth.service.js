import axios, { HttpStatusCode } from "axios";

const authApi = axios.create({
    baseURL: "http://localhost:3002/api/auth",
    validateStatus: () => true
});

const signIn = async (email, password) => {
    const response = await authApi.post("signin", { email, password });
    if (response.status != HttpStatusCode.Ok) {
        throw new Error(response.data.message);
    }
    
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    return response.data;
};

const signUp = async (email, password) => {
    const response = await authApi.post("signup", { email, password });
    if (response.status != HttpStatusCode.Ok) {
        throw new Error(response.data.message);
    }

    localStorage.setItem("currentUser", JSON.stringify(response.data));
    return response.data;
};

const signOut = () => {
    if (localStorage.getItem("currentUser")) {
        localStorage.removeItem("currentUser");
    }
};

const getCurrentUser = () => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        return null;
    }

    return JSON.parse(currentUser);
};

const isAuthenticated = () => {
    return getCurrentUser() ? true : false;
};

const AuthService = {
    signIn,
    signUp,
    signOut,
    isAuthenticated,
    getCurrentUser
};

export default AuthService;
