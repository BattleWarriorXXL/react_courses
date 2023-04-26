import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/auth.types";
import { signIn, signOut, signUp } from "./auth.actions";
import AuthService from "../../services/auth.service";

const initialState: AuthState = {
    user: AuthService.getCurrentUser(),
    loading: false,
    isAuthenticated: AuthService.isAuthenticated(),
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [signUp.pending.type]: (state: AuthState) => {
            state.loading = true;
            state.error = null;
        },
        [signUp.fulfilled.type]: (state: AuthState, { payload }) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = payload;
        },
        [signUp.rejected.type]: (state: AuthState, { error }) => {
            state.loading = false;
            state.error = error.message;
        },
        [signIn.pending.type]: (state: AuthState) => {
            state.loading = true;
            state.error = null;
        },
        [signIn.fulfilled.type]: (state: AuthState, { payload }) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = payload;
        },
        [signIn.rejected.type]: (state: AuthState, { error }) => {
            state.loading = false;
            state.error = error.message;
        },
        [signOut.pending.type]: (state: AuthState) => {
            state.loading = true;
        },
        [signOut.fulfilled.type]: (state: AuthState) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        }
    }
});

export default authSlice.reducer;
