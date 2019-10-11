import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAuthGuard } from 'src/app/gaurds/adminauth.gaurds';
import { UserComponent } from './user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: '', component: UserComponent, canActivate: [AdminAuthGuard] },
  { path: 'add', component: UserAddComponent, canActivate: [AdminAuthGuard] },
  { path: 'edit/:id', component: UserEditComponent, canActivate: [AdminAuthGuard] },
  { path: ':id', component: UserDetailsComponent, canActivate: [AdminAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
export const userRoutingComponents = [
  UserComponent,
  UserAddComponent,
  UserEditComponent,
  UserDetailsComponent,
];