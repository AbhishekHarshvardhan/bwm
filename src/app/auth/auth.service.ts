import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import * as moment from "moment";

class DecodedToken {
  exp: number = 0;
  username: string = "";
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private decodedToken;

  constructor(private httpClient: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem("bwm_meta")) || new DecodedToken();
  }

  register(userData) {
    return this.httpClient.post("/api/v1/users/register", userData);
  }
  login(userData) {
    return this.httpClient
      .post("/api/v1/users/auth", userData)
      .pipe(map(token => this.saveToken(token)));
  }

  private saveToken(token) {
    const helper = new JwtHelperService();
    this.decodedToken = helper.decodeToken(token);
    localStorage.setItem("bwm_token", token);
    localStorage.setItem("bwm_meta", JSON.stringify(this.decodedToken));
    return token;
  }

  isAuthenticated(): boolean {
    return moment().isBefore(this.getTokenExpirationValue());
  }

  private getTokenExpirationValue() {
    return moment.unix(this.decodedToken.exp);
  }

  logOut() {
    localStorage.removeItem("bwm_token");
    localStorage.removeItem("bwm_meta");
    this.decodedToken = new DecodedToken();
  }

  getUsername(): string {
    return this.decodedToken.username;
  }

  getAuthToken(): string {
    return localStorage.getItem("bwm_token");
  }
}
