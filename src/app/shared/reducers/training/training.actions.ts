import { createAction, props } from '@ngrx/store';
import { Exercise } from 'src/app/training/exercise.model';
import { TRAINING_TYPES } from './training.types';

export const setAvailableTraining = createAction(
  TRAINING_TYPES.SET_AVAILABLE_TRAININGS,
  props<{ availableExercises: Exercise[] }>()
);
export const setFinishedTraining = createAction(
  TRAINING_TYPES.SET_FINISHED_TRAININGS,
  props<{ newfinishedExercises: Exercise[] }>()
);
export const startTraining = createAction(
  TRAINING_TYPES.START_TRAINING,
  props<{ exercise: string }>()
);
export const stopTraining = createAction(TRAINING_TYPES.STOP_TRAINING);
