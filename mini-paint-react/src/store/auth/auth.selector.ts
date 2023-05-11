import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const isAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export const isAuthenticatedSelector = createSelector(
    isAuthenticated,
    (isAuthenticated) => isAuthenticated
);
