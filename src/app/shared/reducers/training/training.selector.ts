import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TrainingState } from './training.types';

export const selectTraining = createFeatureSelector<TrainingState>('training');

export const selectAvailableExercises = createSelector(
  selectTraining,
  (state: TrainingState) => state.availableExercises
);
export const selectFinishedExercises = createSelector(
  selectTraining,
  (state: TrainingState) => state.finishedExercises
);
export const selectActiveExercise = createSelector(
  selectTraining,
  (state: TrainingState) => state.activeTraining
);
export const selectIsTraining = createSelector(
  selectTraining,
  (state: TrainingState) => state.activeTraining != null
);
