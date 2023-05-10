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
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state: AuthState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state: AuthState, { payload }) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = payload ?? null;
            })
            .addCase(signUp.rejected, (state: AuthState, { error }) => {
                state.loading = false;
                state.error = error.message ?? null;
            })
            .addCase(signIn.pending, (state: AuthState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state: AuthState, { payload }) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = payload ?? null;
            })
            .addCase(signIn.rejected, (state: AuthState, { error }) => {
                state.loading = false;
                state.error = error.message ?? null;
            })
            .addCase(signOut.pending, (state: AuthState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signOut.fulfilled, (state: AuthState) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(signOut.rejected, (state: AuthState, { error }) => {
                state.loading = false;
                state.error = error.message ?? null;
            });
    }
});

export default authSlice.reducer;
