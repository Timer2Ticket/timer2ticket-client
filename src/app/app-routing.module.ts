import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { RegistrationRequestDoneComponent } from './components/auth/registration/done/done.component';
import { RegistrationCompleteComponent } from './components/auth/registration/registration-complete.component';
import { RegistrationRequestComponent } from './components/auth/registration/request/registration.component';
import { ConfirmationComponent } from './components/config-steps/confirmation/confirmation.component';
import { RedmineConfigurationComponent } from './components/config-steps/redmine-configuration/redmine-configuration.component';
import { ScheduleComponent } from './components/config-steps/schedule/schedule.component';
import { ServicesChooseComponent } from './components/config-steps/services-choose/services-choose.component';
import { TogglTrackConfigurationComponent } from './components/config-steps/toggl-track-configuration/toggl-track-configuration.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ResetPasswordDoneComponent } from './components/reset-password/done/done.component';
import { ResetPasswordRequestComponent } from './components/reset-password/request/request.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';
import { OverviewGuard } from './guards/overview.guard';

const routes = [
  { path: 'registration/request', component: RegistrationRequestComponent },
  { path: 'registration/done', component: RegistrationRequestDoneComponent },
  { path: 'registration/:token', component: RegistrationCompleteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'reset-password/request', component: ResetPasswordRequestComponent },
  { path: 'reset-password/done', component: ResetPasswordDoneComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'config-steps/services-choose', component: ServicesChooseComponent, canActivate: [AuthGuard] },
  { path: 'config-steps/redmine-configuration', component: RedmineConfigurationComponent, canActivate: [AuthGuard] },
  { path: 'config-steps/toggl-track-configuration', component: TogglTrackConfigurationComponent, canActivate: [AuthGuard] },
  { path: 'config-steps/schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
  { path: 'config-steps/confirmation', component: ConfirmationComponent, canActivate: [AuthGuard] },
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard, OverviewGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },

  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
