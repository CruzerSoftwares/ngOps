/**
 * User Edit Component class
 *
 * @category ACL
 * @package ManageACL
 * @author RN Kushwaha <ram.kushwaha@cardekho.com>
 * @copyright CARDEKHO
 * @version 1.0.0
 * @since version 1.0.0
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { TitleService } from 'src/app/services/title.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: any = {};
  url = 'users';
  ngForm: FormGroup;
  constructor(private api: ApiService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private ts: TitleService) {
    this.createForm();
   }

  public getUser = () => {
    this.route.params.subscribe(params => {
      this.api.getSingle({ url: this.url, id: params.id }).subscribe(res => {
        const data = res;
        this.user = data;
        this.ngForm.get('first_name').setValue(data.first_name);
        this.ngForm.get('last_name').setValue(data.last_name);
        this.ngForm.get('email').setValue(data.email);
        this.ngForm.get('status').setValue(data.statusId);
      });
    });
  }

  createForm() {
    this.ngForm = this.fb.group(
      {
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        status: ['', [Validators.required]],
      });
  }

  deleteRecord(id) {
    this.api.delete({ id: id, url: this.url }).subscribe((res: any) => {
      if (typeof res !== undefined && res !== '' && res.error === false) {
        swal.fire({
          type: 'success',
          title: 'Selected record has been deleted.',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate([this.url]);
      }
    });
  }

  update() {
    this.route.params.subscribe(params => {
    const obj = {
      first_name: this.ngForm.get('first_name').value,
      last_name: this.ngForm.get('last_name').value,
      email: this.ngForm.get('email').value,
      status: this.ngForm.get('status').value,
      url: this.url,
      id : params.id
    };

    this.api
      .update(obj)
      .subscribe((res:any) => {
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
    });
  }

  ngOnInit() {
    this.ts.setTitle('Edit User');
    this.getUser();
  }
}
