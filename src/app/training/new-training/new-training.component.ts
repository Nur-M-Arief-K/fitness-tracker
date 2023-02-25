import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent {
  exercises: Exercise[] =[];

  constructor(private trainingService: TrainingService) {
  }
  
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercises;
  }
}
