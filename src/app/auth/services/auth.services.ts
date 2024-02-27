import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {Observable, map} from 'rxjs';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {AuthResponseInterface} from '../types/authResponse.interface';
import {environment} from '../../../environments/environment';
import {LoginRequestInterface} from '../types/loginRequest.interface';
import {CurrentUserRequestInterface} from '../../shared/types/currentUserRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }
  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }
  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }
  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user';
    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser));
  }
  updateCurrentUser(currentUserRequest: CurrentUserRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user';
    return this.http
      .put<AuthResponseInterface>(url, currentUserRequest)
      .pipe(map(this.getUser));
  }
}
