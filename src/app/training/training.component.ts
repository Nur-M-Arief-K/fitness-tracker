import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppCompleteState } from '../app.reducer';
import { selectIsTraining } from '../shared/reducers/training/training.selector';
import { selectIsLoading } from '../shared/reducers/ui/ui.selector';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  onGoingTraining$: Observable<boolean>;

  constructor(private store: Store<AppCompleteState>) {}

  ngOnInit(): void {
    this.onGoingTraining$ = this.store.select(selectIsTraining);
  }
}
