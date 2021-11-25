import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private _registrationApiUrl: string = '/api/registration';

  constructor(
    private _http: HttpClient,
  ) { }

  registerUsername(username: string): Observable<{}> {
    console.log("***** USER ***** register");
    return this._http.post<{}>(this._registrationApiUrl,
      {
        username: username,
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          // rethrow status back to the component
          return throwError(error);
        })
      );
  }

  completeRegistration(token: string, password: string, passwordAgain: string): Observable<{}> {
    console.log("***** USER ***** complete-registration");
    return this._http.post<{}>(`${this._registrationApiUrl}/${token}`,
      {
        password: password,
        passwordAgain: passwordAgain,
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          // rethrow status back to the component
          return throwError(error);
        })
      );
  }
}
