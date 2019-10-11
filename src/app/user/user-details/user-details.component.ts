/**
 * User Details Component class
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
import { ApiService } from 'src/app/services/api.service';
import { TitleService } from 'src/app/services/title.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any = {};
  url = 'users';
  constructor(private api: ApiService, 
              private route: ActivatedRoute, 
              private router: Router, 
              private ts: TitleService) { }

  public getUser = () => {
    this.route.params.subscribe(params => {
      this.api.getSingle({url: this.url, id: params.id}).subscribe(res => {
        this.user = res;
      });
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

  ngOnInit() {
    this.ts.setTitle('User Details');
    this.getUser();
  }
}
