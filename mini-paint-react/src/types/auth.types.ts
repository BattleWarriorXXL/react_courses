import User from "./user.type";

export interface AuthState {
    user: User | null,
    isLoggedIn: boolean
}
