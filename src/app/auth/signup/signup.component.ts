import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppCompleteState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { selectIsLoading } from 'src/app/shared/reducers/ui/ui.selector';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<AppCompleteState>) {}

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
