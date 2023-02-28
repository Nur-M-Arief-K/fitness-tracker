import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainingService } from '../training.service';
import { Observable } from 'rxjs';
import { Exercise } from '../exercise.model';
import { Store } from '@ngrx/store';
import { AppCompleteState } from 'src/app/app.reducer';
import { selectIsLoading } from 'src/app/shared/reducers/ui/ui.selector';
import { selectAvailableExercises } from 'src/app/shared/reducers/training/training.selector';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[] | null | undefined> ;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<AppCompleteState>
  ) {}

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnInit(): void {
    this.exercises$ = this.store.select(selectAvailableExercises);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
}
