export interface UiState {
  isLoading: boolean;
}

export enum UI_TYPE {
  START_LOADING = '[UI] START LOADING',
  STOP_LOADING = '[UI] STOP LOADING',
}
