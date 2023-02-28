import { createReducer, on } from '@ngrx/store';
import { startLoadingAction, stopLoadingAction } from './ui.actions';
import { UiState } from './ui.types';

export const uiInitialState: UiState = {
  isLoading: false,
};

export const uiReducer = createReducer(
  uiInitialState,
  on(startLoadingAction, (state) => ({ ...state, isLoading: true })),
  on(stopLoadingAction, (state) => ({ ...state, isLoading: false })),
);
