import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/gaurds/auth.gaurds';

import { LogsComponent } from './logs.component';
import { LogsAddComponent } from './logs-add/logs-add.component';

const routes: Routes = [
  { path: '', component: LogsComponent, canActivate: [AuthGuard] },
  { path: 'add', component: LogsAddComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
export const logsRoutingComponents = [
  LogsComponent,
  LogsAddComponent
];
