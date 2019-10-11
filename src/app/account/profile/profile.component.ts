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
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email: string = '';
  ngForm: FormGroup;
  constructor(private api: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ts: TitleService) {
    this.createForm();
  }

  public getUser = () => {
    this.route.params.subscribe(params => {
      this.api.makeRequest({ url: 'auth/me', method: 'get', data: {} }).subscribe((res: any) => {
        const data = res.data;
        this.ngForm.get('first_name').setValue(data.first_name);
        this.ngForm.get('last_name').setValue(data.last_name);
        this.email = data.email;
      });
    });
  }

  createForm() {
    this.ngForm = this.fb.group(
      {
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
      });
  }


  update() {
    this.route.params.subscribe(params => {
      const obj = {
        first_name: this.ngForm.get('first_name').value,
        last_name: this.ngForm.get('last_name').value,
      };

      this.api
        .makeRequest({ url: 'auth/me', method: 'put', data: obj })
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
    this.ts.setTitle('Update Profile');
    this.getUser();
  }
}
