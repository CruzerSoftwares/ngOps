/**
 * Login Component class
 *
 * @category ACL
 * @package ManageACL
 * @author RN Kushwaha <ram.kushwaha@cardekho.com>
 * @copyright CARDEKHO
 * @version 1.0.0
 * @since version 1.0.0
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TitleService } from 'src/app/services/title.service';
import swal from 'sweetalert2';

const JSON_API_URL = 'https://api.ipify.org/?format=json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  deviceInfo = null;
  ip = null;
  loginForm: FormGroup;
  returnUrl: string;
  hide = true;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ts: TitleService,
    private as: AuthenticationService,
    private deviceService: DeviceDetectorService,
    private http: HttpClient
  ) {
    this.createForm();
    this.getDevieInfo();
    this.getClientIP();
  }

  getDevieInfo() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  getClientIP() {
    this.http.get<any>(JSON_API_URL).subscribe((result: any) => {
      this.ip = result.ip;
    });
  }
  
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    let device = 'unknown';
    if( this.deviceService.isMobile()) device = 'mobile';
    if( this.deviceService.isTablet()) device = 'tablet';
    if( this.deviceService.isDesktop()) device = 'desktop';

    const obj = {
      ip: this.ip,
      device: device,
      os: this.deviceService.os,
      os_version: this.deviceService.os_version,
      browser: this.deviceService.browser,
      browser_version: this.deviceService.browser_version,
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };

    this.as
      .login(obj)
      .subscribe((res: any) => {
        if (typeof res !== undefined) {
          if (typeof res.success !== undefined && res.success === true) {
            this.route.queryParams.subscribe(params => {
              if (params.returnUrl) {
                this.router.navigate([params.returnUrl]);
              } else {
                this.router.navigate(['/dashboard']);
              }
            });
          } else {
            swal.fire({
              title: 'Warning!',
              text: res.msg,
              type: 'error',
              confirmButtonText: 'Try Again'
            })
          }
        } else {
          swal.fire({
            title: 'Warning!',
            text: 'Invalid Email/Password',
            type: 'error',
            confirmButtonText: 'Try Again'
          })
        }
      },
      error => {
        this.error = error;
      });
  }

  checkLogin() {
    if (this.as.isLoggedIn()) {
      this.route.queryParams.subscribe(params => {
        if (params.returnUrl) {
          this.router.navigate([params.returnUrl]);
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }

  ngOnInit() {
    this.ts.setTitle('Login');
    this.checkLogin();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
}
