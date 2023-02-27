import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';
import {
  Firestore,
  collection,
  collectionChanges,
  doc,
  addDoc,
  updateDoc,
  FirestoreError
} from '@angular/fire/firestore';
import { map, Subscription } from 'rxjs';
import { UiService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private availableExercises: Exercise[] = [];

  private runnningExercise: Exercise | undefined | null;

  get getRunningExercise() {
    return { ...this.runnningExercise };
  }

  private fbSubs: Subscription[] = [];

  exerciseChanged = new Subject<Exercise | null>();

  exercisesChanged = new Subject<Exercise[] | null>();

  finishedExercisesChanged = new Subject<Exercise[]>();

  constructor(private firestore: Firestore, private uiService: UiService) {}

  fetchCompletedOrCancelledExercises() {
    const collectionRef = collection(this.firestore, 'finishedExercises');
    this.fbSubs.push(collectionChanges(collectionRef)
      .pipe(
        map((docArray) =>
          docArray.map((doc) => ({
            id: doc.doc.id,
            name: doc.doc.data()['name'],
            duration: doc.doc.data()['duration'],
            calories: doc.doc.data()['calories'],
            state: doc.doc.data()['state'],
            date: doc.doc.data()['date'].toDate(),
          }))
        )
      )
      .subscribe({
        next: (exercises: Exercise[]) => {
          this.finishedExercisesChanged.next(exercises);
        },
      }));
  }

  fetchAvailableExercises() {
    const collectionRef = collection(this.firestore, 'availableExercises');
    this.fbSubs.push(collectionChanges(collectionRef)
      .pipe(
        map((docArray) => 
          docArray.map((doc) => ({
            id: doc.doc.id,
            name: doc.doc.data()['name'],
            duration: doc.doc.data()['duration'],
            calories: doc.doc.data()['calories'],
          }))
        )
      )
      .subscribe({
        next: (exercises: Exercise[]) => {
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
          this.uiService.loadingStateChanged.next(false);
        },
        error: (err: FirestoreError) => {
          this.uiService.showSnackbar(err.message, undefined, 3000);
          this.uiService.loadingStateChanged.next(false);
          this.exercisesChanged.next(null);
        }
      }));
  }

  startExercise(selectedId: string) {
    // const docRef = doc(this.firestore, `availableExercises/${selectedId}`);
    // updateDoc(docRef, {lastSelected: new Date()});
    this.runnningExercise = this.availableExercises.find(
      (ex) => ex.id == selectedId
    );
    if (typeof this.runnningExercise == 'object') {
      this.exerciseChanged.next({ ...this.runnningExercise });
    }
  }

  completeExercise() {
    this.addDataToDatabase({
      ...(this.runnningExercise as Exercise),
      date: new Date(),
      state: 'completed',
    });
    this.runnningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...(this.runnningExercise as Exercise),
      duration: <number>this.runnningExercise?.duration * (progress / 100),
      calories: <number>this.runnningExercise?.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runnningExercise = null;
    this.exerciseChanged.next(null);
  }

  private addDataToDatabase(exercise: Exercise) {
    const collectionRef = collection(this.firestore, 'finishedExercises');
    addDoc(collectionRef, exercise);
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(subscription => subscription.unsubscribe());
  }
}
