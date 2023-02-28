import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppCompleteState } from '../app.reducer';
import { selectIsAuthenticated } from '../shared/reducers/auth/auth.selector';
import { take, takeLast } from 'rxjs';

export const canMatchRoute: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const store = inject(Store<AppCompleteState>);
  return store.select(selectIsAuthenticated).pipe(take(1));
};
