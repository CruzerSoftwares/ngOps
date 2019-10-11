/**
 * Dashboard Component class
 *
 * @category ACL
 * @package ManageACL
 * @author RN Kushwaha <ram.kushwaha@cardekho.com>
 * @copyright CARDEKHO
 * @version 1.0.0
 * @since version 1.0.0
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from 'src/app/services/title.service';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  ngForm: FormGroup;
  hideOld = true;
  hide    = true;
  hideCon = true;
  constructor(private api: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ts: TitleService) {
    this.createForm();
  }

  createForm() {
    this.ngForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  update() {
    this.route.params.subscribe(params => {
      const obj = {
        oldPassword: this.ngForm.get('oldPassword').value,
        password: this.ngForm.get('password').value,
        confirmPassword: this.ngForm.get('confirmPassword').value,
      };

      this.api
        .makeRequest({ url: 'auth/update-password', method: 'put', data: obj })
        .subscribe((res: any) => {
          if (typeof res !== undefined) {
            if (typeof res.error !== undefined && res.error === false) {
              swal.fire({
                title: 'Success!',
                text: res.message,
                type: 'success',
                confirmButtonText: 'OK'
              })
            } else {
              swal.fire({
                title: 'Warning!',
                text: res.message,
                type: 'error',
                confirmButtonText: 'Try Again'
              })
            }
          } else {
            console.log('err');
          }
        });
    });
  }

  ngOnInit() {
    this.ts.setTitle('Update Password');
  }
}
