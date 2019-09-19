import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../models/userinfo.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiURL = this.baseUrl + "api/accounts";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  createUser(userInfo: UserInfo): Observable<any> {
    return this.http.post<any>(this.apiURL + "Create", userInfo);
  }

  Login(userInfo: UserInfo): Observable<any> {
    return this.http.post<any>(this.apiURL + "Login", userInfo);
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

  getTokenExpiration(): string {
    return localStorage.getItem("tokenExpiration");
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
  }

  isAuthenticated(): boolean {
    var expiration = this.getTokenExpiration();

    if (!expiration) { return false; }

    var now = new Date().getTime();
    var dateExpiration = new Date(expiration);

    if (now >= dateExpiration.getTime()) {
      this.logout();
      return false;
    } else {
      return true;
    }
  }
}
