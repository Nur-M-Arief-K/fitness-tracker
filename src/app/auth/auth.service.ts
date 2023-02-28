import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  authState,
  AuthError,
} from '@angular/fire/auth';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { AppCompleteState } from '../../app/app.reducer';
import { stopLoadingAction, startLoadingAction } from '../shared/reducers/ui/ui.actions';
import { setAuthenticated, setUnauthenticated } from '../shared/reducers/auth/auth.actions';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private auth: Auth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<AppCompleteState>
  ) {}

  initAuthListener() {
    authState(this.auth).subscribe({
      next: (user) => {
        if (user) {
          this.store.dispatch(setAuthenticated());
          this.router.navigate(['/training']);
        } else {
          this.trainingService.cancelSubscriptions();
          this.store.dispatch(setUnauthenticated());
          this.router.navigate(['/login']);
        }
      },
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(startLoadingAction());
    createUserWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((res) => {
        console.log(res);
      })
      .catch((err: AuthError) => {
        this.uiService.showSnackbar(err.message, undefined, 3000);
      })
      .finally(() => {
        this.store.dispatch(stopLoadingAction());
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(startLoadingAction());
    signInWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((res) => {
        console.log(res);
      })
      .catch((err: AuthError) => {
        this.uiService.showSnackbar(err.message, undefined, 3000);
      })
      .finally(() => {
        this.store.dispatch(stopLoadingAction());
      });
  }

  logout() {
    signOut(this.auth);
  }

}
