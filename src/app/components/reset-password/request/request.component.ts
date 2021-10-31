import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class ResetPasswordRequestComponent {

  public username = '';

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    public app: AppComponent,
  ) { }

  public sendResetPasswordRequest(): void {
    if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(this.username)) {
      this.app.buildNotification('You need to enter the email in the correct format.');
      return;
    }

    this.app.showLoading();
    this._authenticationService
      .resetPasswordRequest(this.username)
      .subscribe(() => {
        this._router.navigate(['reset-password/done'], { replaceUrl: true });
        this.app.hideLoading();
      }, (errorStatus) => {
        if (errorStatus < 500) {
          this.app.buildNotification('User with this email does not exist.');
        } else {
          this.app.buildNotification('Server did not respond. Try again please.');
        }
        this.app.hideLoading();
      });
  }

}
