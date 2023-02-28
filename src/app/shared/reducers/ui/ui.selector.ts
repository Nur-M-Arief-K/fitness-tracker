import { createSelector, createFeatureSelector } from "@ngrx/store";
import { UiState } from "./ui.types";

export const selectUi = createFeatureSelector<UiState>('ui');

export const selectIsLoading = createSelector(selectUi, (state: UiState) => state.isLoading);