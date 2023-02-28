import { ActionReducerMap } from "@ngrx/store";
import { UiState } from "./shared/reducers/ui/ui.types";
import { uiReducer } from "./shared/reducers/ui/ui.reducer";
import { authReducer } from "./shared/reducers/auth/auth.reducer";
import { AuthState } from "./shared/reducers/auth/auth.types";
import { TrainingState } from "./shared/reducers/training/training.types";

export interface AppPartialState {
    ui: UiState,
    auth: AuthState,
}

export interface AppCompleteState extends AppPartialState {
    training: TrainingState
}

export const appReducer: ActionReducerMap<AppPartialState> = {
    ui: uiReducer,
    auth: authReducer,
}