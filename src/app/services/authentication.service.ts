import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _authenticationApiUrl: string = 'api/authentication';

  constructor(
    private _http: HttpClient,
  ) { }

  authenticate(username: string, password: string): Observable<User> {
    console.log("***** USER ***** authenticate");
    return this._http.post<User>(this._authenticationApiUrl,
      {
        username: username,
        password: password,
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          // rethrow status back to the component
          return throwError(error);
        })
      );
  }

  resetPasswordRequest(username: string): Observable<Record<string, unknown>> {
    console.log("***** USER ***** reset password request");
    return this._http.post<Record<string, unknown>>(`${this._authenticationApiUrl}/reset`, { username: username })
      .pipe(
        catchError((error) => {
          console.error(error);
          // rethrow status back to the component
          return throwError(error);
        })
      );
  }

  resetPassword(resetPasswordToken: string, newPassword: string, newPasswordAgain: string): Observable<Record<string, unknown>> {
    console.log("***** USER ***** reset password");
    return this._http.post<Record<string, unknown>>(`${this._authenticationApiUrl}/reset/${resetPasswordToken}`,
      { newPassword: newPassword, newPasswordAgain: newPasswordAgain })
      .pipe(
        catchError((error) => {
          console.error(error);
          // rethrow status back to the component
          return throwError(error);
        })
      );
  }
}
