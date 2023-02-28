import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./auth.types";

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(selectAuth, (state: AuthState) => state.isAuthenticated);