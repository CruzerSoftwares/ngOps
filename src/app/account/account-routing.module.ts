import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/gaurds/auth.gaurds';

import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendancesComponent } from './attendances/attendances.component';
import { FinesComponent } from './fines/fines.component';
import { LoginsComponent } from './logins/logins.component';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'attendance', component: AttendancesComponent, canActivate: [AuthGuard] },
  { path: 'fines', component: FinesComponent, canActivate: [AuthGuard] },
  { path: 'logs', loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule) },
  { path: 'logins', component: LoginsComponent, canActivate: [AuthGuard] },
  { path: 'update-password', component: PasswordComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
export const accountRoutingComponents = [
  DashboardComponent,
  AccountComponent,
  AttendancesComponent,
  FinesComponent,
  LoginsComponent,
  PasswordComponent,
  ProfileComponent,
];