import { createReducer, on } from '@ngrx/store';
import { TrainingState } from './training.types';
import {
  stopTraining,
  startTraining,
  setAvailableTraining,
  setFinishedTraining,
} from './training.actions';

export const trainingInitialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null,
};

export const trainingReducer = createReducer(
  trainingInitialState,
  on(setAvailableTraining, (state, { availableExercises }) => ({
    ...state,
    availableExercises: availableExercises,
  })),
  on(setFinishedTraining, (state, { newfinishedExercises }) => ({
    ...state,
    finishedExercises: newfinishedExercises,
  })),
  on(startTraining, (state, { exercise }) => ({
    ...state,
    activeTraining: state.availableExercises.find(exe => exe.id == exercise),
  })),
  on(stopTraining, (state) => ({
    ...state,
    activeTraining: null
  }))
);
