import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from '../shared/reducers/training/training.reducer';

@NgModule({
  declarations: [
    NewTrainingComponent,
    PastTrainingComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    StopTrainingComponent,
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer),
  ],
  exports: [],
})
export class TrainingModule {}
