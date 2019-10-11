import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LogsRoutingModule, logsRoutingComponents } from './logs-routing.module';

@NgModule({
  declarations: [logsRoutingComponents],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'mr10 btn btn-primary',
      cancelButtonClass: 'btn btn-warning'
    }),
    LogsRoutingModule
  ]
})
export class LogsModule { }
