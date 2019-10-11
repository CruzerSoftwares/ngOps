import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

import { UserRoutingModule, userRoutingComponents } from './user-routing.module';

@NgModule({
  declarations: [
    userRoutingComponents
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'mr10 btn btn-primary',
      cancelButtonClass: 'btn btn-warning'
    })
  ]
})
export class UserModule { }
