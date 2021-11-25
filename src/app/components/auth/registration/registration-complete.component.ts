import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration-complete',
  templateUrl: './registration-complete.component.html',
  styleUrls: ['./registration-complete.component.css']
})
export class RegistrationCompleteComponent implements OnInit {

  public registrationToken = '';

  public preRegistratedUser = {
    password: '',
    passwordAgain: '',
  };

  constructor(
    private _registrationService: RegistrationService,
    private _router: Router,
    public app: AppComponent,
  ) { }

  ngOnInit(): void {
    const urlSplitted = this._router.url.split('/');

    // firstly, try to grab token from url
    if (urlSplitted.length === 3 && urlSplitted[urlSplitted.length - 1].length === 24) {
      // token from url should have 24 characters
      this.registrationToken = urlSplitted[urlSplitted.length - 1];
    }

    // should be filled
    if (this.registrationToken === '') {
      this._router.navigate(['/'], { replaceUrl: true });
    }
  }

  register(): void {
    if (this.preRegistratedUser.password !== this.preRegistratedUser.passwordAgain) {
      this.app.buildNotification('Passwords are not the same.');
    } else {
      this.app.showLoading();
      this._registrationService.completeRegistration(
        this.registrationToken,
        this.preRegistratedUser.password,
        this.preRegistratedUser.passwordAgain,
      ).subscribe(() => {
        this.redirect();
        this.app.hideLoading();
        this.app.buildNotification('Successfully registrated. Please log in to continue.');
      }, (errorStatus) => {
        console.log(errorStatus);
        if (errorStatus === 409) {
          this.app.buildNotification('User with this email already exists.');
        } else if (errorStatus === 400) {
          this.app.buildNotification('Passwords are not the same.');
        } else if (errorStatus === 404) {
          this.app.buildNotification('Link is incorrect or has expired or something similar happened.');
        } else {
          this.app.buildNotification('Server did not respond. Try again please.');
        }
        this.app.hideLoading();
      });
    }
  }

  private redirect(): void {
    this._router.navigate(['login']);
  }
}
