import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAuthGuard } from 'src/app/gaurds/adminauth.gaurds';

import { SettingsComponent } from './settings.component';
import { HolidaysComponent } from './holidays/holidays.component';

const routes: Routes = [
  { path: '', component: SettingsComponent, canActivate: [AdminAuthGuard] },
  { path: 'holidays', component: HolidaysComponent, canActivate: [AdminAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
export const settingsRoutingComponents = [
  SettingsComponent,
  HolidaysComponent,
];