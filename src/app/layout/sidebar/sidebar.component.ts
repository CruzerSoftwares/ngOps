import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: User;
  linkClass: string = 'collapsed';
  expanded: string = ' aria-expanded="false" ';
  show: string = '';

  constructor(public authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() { 
    if(this.currentUser.role_id!=1){
      this.linkClass = ''; 
      this.expanded = ' aria-expanded="true" '; 
      this.show = 'show'; 
    }
  }

}
