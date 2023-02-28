import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppCompleteState } from 'src/app/app.reducer';
import { selectActiveExercise } from 'src/app/shared/reducers/training/training.selector';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<AppCompleteState>
  ) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.select(selectActiveExercise).pipe(take(1)).subscribe({
      next: (exercise) => {
        const step = (exercise!.duration / 100) * 1000;
        this.timer = setInterval(() => {
          this.progress += 1;
          if (this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      },
    });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
