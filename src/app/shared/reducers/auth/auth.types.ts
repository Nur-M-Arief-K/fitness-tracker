export interface AuthState {
    isAuthenticated: boolean;
  }
  
  export enum AUTH_TYPE {
    SET_AUTHENTICATED = '[AUTH] SET AUTHENTICATED',
    SET_UNAUTHENTICATED = '[AUTH] SET UNAUTHENTICATED',
  }
  