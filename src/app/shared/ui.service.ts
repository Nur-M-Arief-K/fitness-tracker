import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  loadingStateChanged = new Subject<boolean>();
  constructor(private _snackbar: MatSnackBar) {}

  showSnackbar(message: string, action: string | undefined, duration: number) {
    this._snackbar.open(message, action, { duration: duration });
  }
}
