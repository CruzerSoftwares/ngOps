import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAuthGuard } from 'src/app/gaurds/adminauth.gaurds';

import { ReportsComponent } from './reports.component';
import { FinanceComponent } from './finance/finance.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LeavesComponent } from './leaves/leaves.component';

const routes: Routes = [
  { path: '', component: ReportsComponent, canActivate: [AdminAuthGuard] },
  { path: 'finance', component: FinanceComponent, canActivate: [AdminAuthGuard] },
  { path: 'attendance', component: AttendanceComponent, canActivate: [AdminAuthGuard] },
  { path: 'leaves', component: LeavesComponent, canActivate: [AdminAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
export const reportsRoutingComponents = [
  ReportsComponent,
  FinanceComponent,
  AttendanceComponent,
  LeavesComponent,
];