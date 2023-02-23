import axios, { HttpStatusCode } from "axios";

const authApi = axios.create({
    // eslint-disable-next-line no-undef
    baseURL: process.env.REACT_APP_IDENTITY_API_BASE_URL,
    validateStatus: () => true
});

const signIn = async (email, password) => {
    const response = await authApi.post("auth/signin", { email, password });
    if (response.status != HttpStatusCode.Ok) {
        throw new Error(response.data.message);
    }
    
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    return response.data;
};

const signUp = async (email, password) => {
    const response = await authApi.post("auth/signup", { email, password });
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

const getAccessToken = () => {
    const currentUser = getCurrentUser();
    return currentUser?.accessToken;
};

const AuthService = {
    signIn,
    signUp,
    signOut,
    isAuthenticated,
    getCurrentUser,
    getAccessToken
};

export default AuthService;
