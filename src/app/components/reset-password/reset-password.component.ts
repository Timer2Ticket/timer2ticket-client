import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordToken = '';

  public newPassword = '';
  public newPasswordAgain = '';

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    public app: AppComponent,
  ) { }

  ngOnInit(): void {
    const urlSplitted = this._router.url.split('/');

    console.log(urlSplitted)

    // firstly, try to grab identificationCode from url
    if (urlSplitted.length === 3 && urlSplitted[urlSplitted.length - 1].length === 24) {
      // code from url should have 16 characters
      this.resetPasswordToken = urlSplitted[urlSplitted.length - 1];
    }

    // should be filled
    if (this.resetPasswordToken === '') {
      this._router.navigate(['/'], { replaceUrl: true });
    }
  }

  public resetPassword(): void {
    if (this.newPassword !== this.newPasswordAgain) {
      this.app.buildNotification('New passwords are not the same.');
      return;
    }

    this.app.showLoading();
    this._authenticationService
      .resetPassword(this.resetPasswordToken, this.newPassword, this.newPasswordAgain)
      .subscribe(() => {
        this.app.buildNotification('Your password reset was successful. You can now log in with the new password.');
        this._router.navigate(['login'], { replaceUrl: true });
        this.app.hideLoading();
      }, (errorStatus) => {
        if (errorStatus < 500) {
          this.app.buildNotification('Link is incorrect or has expired or something similar happened.');
        } else {
          this.app.buildNotification('Server did not respond. Try again please.');
        }
        this.app.hideLoading();
      });
  }

}
