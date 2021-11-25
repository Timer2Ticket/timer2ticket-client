import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationRequestComponent {

  public username = '';

  constructor(
    private _registrationService: RegistrationService,
    private _router: Router,
    public app: AppComponent,
  ) { }

  register(): void {
    this.app.showLoading();
    this._registrationService.registerUsername(
      this.username,
    ).subscribe(() => {
      this.redirect();
      this.app.hideLoading();
    }, (errorStatus) => {
      console.log(errorStatus);
      if (errorStatus === 409) {
        this.app.buildNotification('User with this email already exists.');
      } else {
        this.app.buildNotification('Server did not respond. Try again please.');
      }
      this.app.hideLoading();
    });
  }

  private redirect(): void {
    this._router.navigate(['registration/done']);
  }
}
