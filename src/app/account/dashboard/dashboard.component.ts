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
import { TitleService } from 'src/app/services/title.service';
import { ApiService } from 'src/app/services/api.service';
import swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  punchedIn: string = '';
  punchedOut: string = '';
  totalUsers: number = 0;
  absentToday: number = 0;
  pendingPayments: number = 0;
  pendingRequests: number = 0;
  currentUser: User;

  constructor(private ts: TitleService, private api: ApiService, public as: AuthenticationService) { 
    this.as.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.ts.setTitle('Dashboard');
    let obj = {
      data: {
        user_id: this.as.currentUserID(),
        browser: ''
      },
      url: 'attendance/getPunching',
      method: 'post',
    };

    this.api.makeRequest(obj).subscribe((res: any) => {
      // if (typeof res !== undefined && res !== '' && res.error === false) {
        this.punchedOut = res.data.punchOut;
        this.punchedIn = res.data.punchIn;
        if (this.currentUser.role_id == 1){
          this.totalUsers = res.data.totalUsers;
          this.absentToday = res.data.absentToday;
          this.pendingPayments = res.data.pendingPayments;
          this.pendingRequests = res.data.pendingRequests;
        }
      // }
    })
  }

  punchIn() {
    let obj = {
      data: {
        user_id: this.as.currentUserID(),
        browser: ''
      },
      url: 'attendance/punch-in',
      method: 'post',
    };

    this.api.makeRequest(obj).subscribe((res: any) => {
      if (typeof res !== undefined && res !== '' && res.error === false) {
        this.punchedIn = res.data.punch_in;
        swal.fire({
          type: 'success',
          title: res.message,
          showConfirmButton: true,
          timer: 1500
        })
      } else{
        swal.fire({
          type: 'error',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }

  punchOut() {
    let obj = {
      data: {
        user_id: this.as.currentUserID(),
        browser: ''
      },
      url: 'attendance/punch-out',
      method: 'post',
    };

    this.api.makeRequest(obj).subscribe((res: any) => {
      if (typeof res !== undefined && res !== '' && res.error === false) {
        this.punchedOut = res.data.punch_out;
        this.punchedIn = res.data.punch_in;
        if (res.data.total_hours<9){
          swal.fire({
            type: 'success',
            title: res.message+'\nYou have not completed 9 hours today!\nPlease fill the reason why less than 9 hours today?',
            showConfirmButton: true
          })
        } else{
          swal.fire({
            type: 'success',
            title: res.message,
            showConfirmButton: true,
            timer: 1500
          })
        }
      } else {
        swal.fire({
          type: 'error',
          title: res.message,
          showConfirmButton: true,
          timer: 1500
        })
      }
    });
  }

}
