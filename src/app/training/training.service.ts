import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];

  get getAvailableExercises() {
    return this.availableExercises.slice();
  }

  private runnningExercise: Exercise | undefined | null;

  get getRunningExercise() {
    return { ...this.runnningExercise };
  }

  private exercises: Exercise[] = [];

  exerciseChanged = new Subject<Exercise | null>();

  startExercise(seelctedId: string) {
    this.runnningExercise = this.availableExercises.find(
      (ex) => ex.id == seelctedId
    );
    if (typeof this.runnningExercise == 'object') {
      this.exerciseChanged.next({ ...this.runnningExercise });
    }
  }

  completeExercise() {
    this.exercises.push({
      ...(this.runnningExercise as Exercise),
      date: new Date(),
      state: 'completed',
    });
    this.runnningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...(this.runnningExercise as Exercise),
      duration: <number>this.runnningExercise?.duration * (progress / 100),
      calories: <number>this.runnningExercise?.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runnningExercise = null;
    this.exerciseChanged.next(null);
  }

  get getExercises() {
    return this.exercises.slice();
  }
  
}
