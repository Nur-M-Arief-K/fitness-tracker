import { createAction } from "@ngrx/store";
import { AUTH_TYPE } from "./auth.types";

export const setAuthenticated = createAction(AUTH_TYPE.SET_AUTHENTICATED);
export const setUnauthenticated = createAction(AUTH_TYPE.SET_UNAUTHENTICATED);