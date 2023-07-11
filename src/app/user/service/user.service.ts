import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { AppConfig } from 'src/app/share/app.config';
import { TokenServiceService } from 'src/app/share/service/token-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginStatus : Subject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser : Subject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig,
    private tokenService : TokenServiceService
  ) { }


  loginServer(loginData: { username: string; password: string; }): Observable<User> {
    let username = loginData.username.trim();
    let password = loginData.password.trim();
    return this.http.post<User>(this.appConfig.logServiceUri + '/login', { userAccountID: username, userPassword: password });
  }

  registeServer(rergisterData: { username: string; password: string; }) : Observable<Response> {
    return this.http.post<Response>(this.appConfig.logServiceUri + '/register', { userAccountID: rergisterData.username, userPassword: rergisterData.password })

  }

  register(rergisterData: { username: string; password: string; }) : Observable<boolean> {
    return this.registeServer(rergisterData).pipe(map(
                                                       (res) => {return true}
                                                      ,(err:HttpErrorResponse) => {return false}
                                                      ));
  }


  login(loginData: { username: string; password: string; }): Observable<boolean> {
    return this.loginServer(loginData).pipe(map(
                                                 (res) => {
                                                            this.tokenService.storeToken(res.token);
                                                            this.loginStatus.next(true);
                                                            res.username = loginData.username;
                                                            this.currentUser.next(res);
                                                            return true;
                                                          }
                                                ,(err : HttpErrorResponse) => {return false}
                                               ));

  }


  logout() {
    this.loginStatus.next(false);
    this.currentUser.next(null);
    this.tokenService.clearToken();
  }

  getLoginStatus(): Observable<boolean> {
    return this.loginStatus;
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser;
}

}
