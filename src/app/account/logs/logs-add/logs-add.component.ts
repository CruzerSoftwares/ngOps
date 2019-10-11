/**
 * user Add Component class
 *
 * @category ACL
 * @package ManageACL
 * @author RN Kushwaha <ram.kushwaha@cardekho.com>
 * @copyright CARDEKHO
 * @version 1.0.0
 * @since version 1.0.0
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { TitleService } from 'src/app/services/title.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-logs-add',
  templateUrl: './logs-add.component.html',
  styleUrls: ['./logs-add.component.css']
})
export class LogsAddComponent implements OnInit {
  ngForm: FormGroup;
  hide = true;
  hideCon = true;
  url = 'logs';
  constructor(private api: ApiService,
              private router: Router,
              private fb: FormBuilder,
              private ts: TitleService) {
    this.createForm();
  }

  createForm() {
    this.ngForm = this.fb.group(
      {
        task: ['', Validators.required],
        started_at: ['', Validators.required],
        ended_at: [''],
        ended_at_time: [''],
        started_at_time: [''],
        status: ['', Validators.required],
        description: [''],
      });
  }

  add() {
      const obj = {
        status: this.ngForm.get('status').value,
        task: this.ngForm.get('task').value,
        ended_at: this.ngForm.get('ended_at').value,
        ended_at_time: this.ngForm.get('ended_at_time').value,
        started_at: this.ngForm.get('started_at').value,
        started_at_time: this.ngForm.get('started_at_time').value,
        description: this.ngForm.get('description').value,
        url: this.url+'/add',
      };

      this.api
        .save(obj)
        .subscribe((res: any) => {
          if (typeof res !== undefined) {
            if (typeof res.error !== undefined && res.error === false) {
              this.router.navigate(['account/'+this.url]);
            } else {
              swal.fire({
                title: 'Warning!',
                text: res.msg,
                type: 'error',
                confirmButtonText: 'Try Again'
              })
            }
          } else {
            console.log('err');
          }
        });
  }

  ngOnInit() {
    this.ts.setTitle('Add Log');
  }
}
