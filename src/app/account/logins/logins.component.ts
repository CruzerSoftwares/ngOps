/**
 * User Component class
 *
 * @category ACL
 * @package ManageACL
 * @author RN Kushwaha <ram.kushwaha@cardekho.com>
 * @copyright CARDEKHO
 * @version 1.0.0
 * @since version 1.0.0
 */
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TitleService } from 'src/app/services/title.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.css']
})

export class LoginsComponent implements OnInit {
  logins: any = [];
  p = 1;
  total = 0;
  pageSize = 10;
  order = 'ASC';
  orderBy = 'logins.id';
  url = 'logins/mylogins';
  loading: boolean;
  search: any = {};
  loginsFound = false;

  constructor(private api: ApiService, 
              private ts: TitleService, 
              public as: AuthenticationService) {
                this.search = {
                  punch_in: '',
                  punch_out: '',
                  status: '',
                  created_at: '',
                };
  }
  
  filterData(){
    this.getPage(1);
  }

  resetData(){
    this.search = {
      punch_in: '',
      punch_out: '',
      status: '',
      created_at: '',
    };
    this.getPage(1);
  }

  setFilterParam(key: string, val: string){
    this.search[key] = val;
  }

  getPage(page: number) {
    this.loading = true;
    this.api.getListData( { 
        url: this.url, order: this.order, orderBy: this.orderBy, page: page, pageSize: this.pageSize, search: this.search
      } )
    .subscribe((res: any) => {
      this.logins = res.data;
      this.total = res.total;
      this.loading = false;
      this.p = page;
      if(res.total>0){
        this.loginsFound = true;
      }
    });
  }

  sortData(orderBy: string) {
    this.loading = true;
    this.api.getListData({ 
      url: this.url, order: this.order === 'ASC' ? 'DESC' : 'ASC', orderBy: orderBy, page: 1, pageSize: this.pageSize, search: this.search
    })
    .subscribe((res: any) => {
      this.logins = res.data;
      this.total = res.total;
      this.loading = false;
      this.p = 1;
      this.orderBy = orderBy;
      this.order = (this.order === 'ASC') ? 'DESC' : 'ASC';
    });
  }

  ngOnInit() {
    this.ts.setTitle('My Logins');
    this.getPage(1);
  }
}
