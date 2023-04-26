import User from "./user.type";

export interface AuthState {
    user: User | null,
    loading: boolean,
    isAuthenticated: boolean,
    error: string | null
}

export interface SignUpModel {
    email: string,
    password: string,
    name: string
}

export interface SignInModel {
    email: string,
    password: string
}
