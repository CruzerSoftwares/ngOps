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
import { MustMatch } from 'src/app/helpers/must-match.validator';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  ngForm: FormGroup;
  hide = true;
  hideCon = true;
  url = 'users';
  constructor(private api: ApiService,
              private router: Router,
              private fb: FormBuilder,
              private ts: TitleService) {
    this.createForm();
  }

  createForm() {
    this.ngForm = this.fb.group(
      {
        status: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  add() {
      const obj = {
        status: this.ngForm.get('status').value,
        first_name: this.ngForm.get('first_name').value,
        last_name: this.ngForm.get('last_name').value,
        email: this.ngForm.get('email').value,
        password: this.ngForm.get('password').value,
        url: this.url,
      };

      this.api
        .save(obj)
        .subscribe((res: any) => {
          if (typeof res !== undefined) {
            if (typeof res.error !== undefined && res.error === false) {
              this.router.navigate([this.url]);
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
    this.ts.setTitle('Add User');
  }
}
