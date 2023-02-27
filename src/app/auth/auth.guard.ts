// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
// import { AuthService } from "./auth.service";

// @Injectable({
//     providedIn: 'root'
// })
// export class AuthGuard {
//     constructor(private authService: AuthService, private router: Router) {}
// canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
//     if(this.authService.isAuth()) {
//         return true;
//     } else {
//         return this.router.navigate(['/login']);
//     }
// }
// }

import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const canMatchRoute: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuth()) {
    return true;
  } else {
    return router.navigate(['/login']);
  }
};
