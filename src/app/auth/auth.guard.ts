import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  navigatedUrl: string;
  constructor(private authService: AuthService, private router: Router) {}

  private handleAuthState(): boolean {
    if (!this.isLoginOrRegister()) return true;
    this.router.navigate(["/rentals"]);
    return false;
  }
  private handleNotAuthState(): boolean {
    if (this.isLoginOrRegister()) return true;
    this.router.navigate(["/login"]);
    return false;
  }

  private isLoginOrRegister(): boolean {
    if (this.navigatedUrl.includes("login") || this.navigatedUrl.includes("register"))
      return true;
    return false;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.navigatedUrl = state.url;
    if (this.authService.isAuthenticated()) return this.handleAuthState();
    return this.handleNotAuthState();
  }
}
