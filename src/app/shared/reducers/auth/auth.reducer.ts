import { createReducer, on } from '@ngrx/store';
import { setAuthenticated, setUnauthenticated } from './auth.actions';
import { AuthState } from './auth.types';

export const authInitialState: AuthState = {
  isAuthenticated: false,
};

export const authReducer = createReducer(
  authInitialState,
  on(setAuthenticated, (state) => ({ ...state, isAuthenticated: true })),
  on(setUnauthenticated, (state) => ({ ...state, isAuthenticated: false })),
);
