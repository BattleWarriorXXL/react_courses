import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";
import { SignUpModel, SignInModel } from "../../types/auth.types";
import { FirebaseError } from "firebase/app";

export const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ email, password, name }: SignUpModel) => {
        try {
            return await AuthService.signUp(email, password, name);
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                switch (error.code) {
                case "auth/invalid-email":
                    throw Error("Please enter a valid email address.");
                case "auth/email-already-in-use":
                    throw Error(`Email ${email} already in use.`);
                case "auth/weak-password":
                    throw Error("Password should be at least 6 characters.");
                default:                    
                    throw Error("An error occurred. Please try again later.");
                }
            }
        }
    }
);

export const signIn = createAsyncThunk(
    "auth/signIn",
    async ({ email, password }: SignInModel) => {
        try {
            return await AuthService.signIn(email, password);
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                switch (error.code) {
                case "auth/invalid-email":
                    throw Error("Please enter a valid email address.");
                case "auth/user-not-found":
                    throw Error(`User with ${email} email doesn't found.`);
                case "auth/wrong-password":
                    throw Error("Wrong password.");
                case "auth/too-many-requests":
                    throw Error("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.");
                default:
                    throw Error("An error occurred. Please try again later.");
                }
            }
        }
    }
);

export const signOut = createAsyncThunk(
    "auth/signOut",
    async () => {
        await AuthService.signOut();
    }
);
