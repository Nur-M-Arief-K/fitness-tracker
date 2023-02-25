import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private authService: AuthService, private router: Router) {}
    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        if(this.authService.isAuth()) {
            return true;
        } else {
            return this.router.navigate(['/login']);
        }
    }
}