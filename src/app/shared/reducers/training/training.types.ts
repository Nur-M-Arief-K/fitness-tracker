import { Exercise } from "src/app/training/exercise.model";

export interface TrainingState {
    availableExercises: Exercise[],
    finishedExercises: Exercise[],
    activeTraining: Exercise | null | undefined,
}

export enum TRAINING_TYPES {
    SET_AVAILABLE_TRAININGS = '[TRAINING] SET AVAILABLE TRAININGS',
    SET_FINISHED_TRAININGS = '[TRAINING] SET FINISHED TRAININGS',
    START_TRAINING = '[TRAINING] START TRAINING',
    STOP_TRAINING = '[TRAINING] STOP TRAINING',
}