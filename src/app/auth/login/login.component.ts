import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { AppCompleteState } from 'src/app/app.reducer';
import { selectIsLoading } from 'src/app/shared/reducers/ui/ui.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<AppCompleteState>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }
}
