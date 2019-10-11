/**
 * Define all the aplication components here that 
 * are needed throuhout the application
 *
 * @category ACL
 * @package ManageACL
 * @author RN Kushwaha <ram.kushwaha@cardekho.com>
 * @copyright CARDEKHO
 * @version 1.0.0
 * @since version 1.0.0
 */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from './services/env.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appUrl = '';

  constructor(
    private location: Location,
    private router: Router,
    public authenticationService: AuthenticationService,
    private env: EnvService,
    private route: ActivatedRoute
  ) {
    this.appUrl = this.env.appUrl;
  }

  goBack(url) {
    if (url === '') {
      if (document.referrer === '') {
        this.router.navigate(['/']);
      } else {
        this.location.back();
      }
    } else {
      this.router.navigate([url]);
    }
  }

  ngOnInit() {
    window.addEventListener('storage', (event) => {
      if (event.storageArea == localStorage) {
        let token = localStorage.getItem('currentUser');
       
        // there is a problem with IE (in all other browsers event not emitted in current window) 
        // so need to check that it is the other tab that emitted event
        // and avoid infinite loop
        if (!document.hasFocus() && event.key === 'currentUser') {
          if (token == null) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
          } else{
            // if multiple tabs are open and user is in login page in all the tabs 
            // and user tries to log in from one of the tab
            // then all the tab should show him logged in
            
            if (this.router.url.match(/login/gi)){
              localStorage.setItem('currentUser', token);
              
              this.route.queryParams.subscribe(params => {
                if (params.returnUrl){
                  this.router.navigate([params.returnUrl]);
                } else{
                  this.router.navigate(['/dashboard']);
                }
              });
            }
          }
        }
      }
    }, false);
  }

}
