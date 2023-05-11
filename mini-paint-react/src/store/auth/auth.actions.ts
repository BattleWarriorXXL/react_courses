import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";
import { SignUpModel, SignInModel } from "../../types/auth.types";
import ErrorService from "../../services/error.service";

export const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ email, password, name }: SignUpModel) => {
        try {
            return await AuthService.signUp(email, password, name);
        } catch (error: unknown) {
            ErrorService.handleError(error);
        }
    }
);

export const signIn = createAsyncThunk(
    "auth/signIn",
    async ({ email, password }: SignInModel) => {
        try {
            return await AuthService.signIn(email, password);
        } catch (error: unknown) {
            ErrorService.handleError(error);
        }
    }
);

export const signOut = createAsyncThunk(
    "auth/signOut",
    async () => {
        await AuthService.signOut();
    }
);
