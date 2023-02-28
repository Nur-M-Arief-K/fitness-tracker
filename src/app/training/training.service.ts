import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import {
  Firestore,
  collection,
  addDoc,
  FirestoreError,
  collectionSnapshots,
  collectionChanges,
} from '@angular/fire/firestore';
import { map, Subscription, take } from 'rxjs';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { stopLoadingAction } from '../shared/reducers/ui/ui.actions';
import { AppCompleteState } from '../app.reducer';
import {
  setAvailableTraining,
  setFinishedTraining,
  startTraining,
  stopTraining,
} from '../shared/reducers/training/training.actions';
import { selectActiveExercise } from '../shared/reducers/training/training.selector';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private fbSubs: Subscription[] = [];

  constructor(
    private firestore: Firestore,
    private uiService: UiService,
    private store: Store<AppCompleteState>
  ) {}

  fetchCompletedOrCancelledExercises() {
    const collectionRef = collection(this.firestore, 'finishedExercises');
    this.fbSubs.push(
      collectionSnapshots(collectionRef)
        .pipe(
          map((docs) =>
            docs.map((doc) => ({
              id: doc.data()['id'],
              name: doc.data()['name'],
              duration: doc.data()['duration'],
              calories: doc.data()['calories'],
              state: doc.data()['state'],
              date: doc.data()['date'].toDate(),
            }))
          )
        )
        .subscribe({
          next: (exercises: Exercise[]) => {
            this.store.dispatch(
              setFinishedTraining({ newfinishedExercises: exercises })
            );
          },
        })
    );
  }

  fetchAvailableExercises() {
    const collectionRef = collection(this.firestore, 'availableExercises');
    this.fbSubs.push(
      collectionSnapshots(collectionRef)
        .pipe(
          map((docs) =>
            docs.map((doc) => ({
              id: doc.id,
              name: doc.data()['name'],
              duration: doc.data()['duration'],
              calories: doc.data()['calories'],
            }))
          )
        )
        .subscribe({
          next: (exercises: Exercise[]) => {
            this.store.dispatch(
              setAvailableTraining({ availableExercises: exercises })
            );
            this.store.dispatch(stopLoadingAction());
          },
          error: (err: FirestoreError) => {
            this.uiService.showSnackbar(err.message, undefined, 3000);
            this.store.dispatch(stopLoadingAction());
          },
        })
    );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(startTraining({ exercise: selectedId }));
  }

  completeExercise() {
    this.store
      .select(selectActiveExercise)
      .pipe(take(1))
      .subscribe((ex) => {
        this.addDataToDatabase({
          ...(ex as Exercise),
          date: new Date(),
          state: 'completed',
        });
        this.store.dispatch(stopTraining());
      });
  }

  cancelExercise(progress: number) {
    this.store
      .select(selectActiveExercise)
      .pipe(take(1))
      .subscribe((ex) => {
        this.addDataToDatabase({
          ...(ex as Exercise),
          duration: <number>ex?.duration * (progress / 100),
          calories: <number>ex?.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled',
        });
        this.store.dispatch(stopTraining());
      });
  }

  private addDataToDatabase(exercise: Exercise) {
    const collectionRef = collection(this.firestore, 'finishedExercises');
    addDoc(collectionRef, exercise);
  }

  cancelSubscriptions() {
    this.fbSubs.forEach((subscription) => subscription.unsubscribe());
  }
}
