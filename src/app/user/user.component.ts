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
import { User } from 'src/app/models/User';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  users: User[] = [];
  p = 1;
  total = 0;
  pageSize = 10;
  order = 'ASC';
  orderBy = 'users.id';
  url= 'users';
  loading: boolean;
  allSelected: boolean = false;
  selectedUsers: any = [];
  search: any = {};
  asearch: any = {};
  usersFound = false;

  constructor(private api: ApiService, 
              private ts: TitleService, 
              public as: AuthenticationService) {
                this.search = {
                  id: '',
                  name: '',
                  email: '',
                  status: '',
                  created_at: '',
                };
                this.asearch = {
                  oid: '=',
                  id: '',
                  oname: '=',
                  name: '',
                  oemail: '=',
                  email: '',
                  ostatus: '=',
                  status: '',
                  created_at: '',
                };
  }
  
  filterData(){
    this.getPage(1);
  }

  resetData(){
    this.search = {
      id: '',
      name: '',
      email: '',
      status: '',
      created_at: '',
    };
    this.getPage(1);
  }

  setFilterParam(key: string, val: string){
    this.search[key] = val;
  }

  collectAllSelected(id: number, event: any) {
    if(event.target.checked===true){
      this.selectedUsers.push(id);
    } else{
      this.selectedUsers = this.selectedUsers.filter(item => item !== id)
    }

    let selCount=0;
    for (let i = 0; i < this.users.length; i++) {
      if(this.users[i].selected === true) selCount++;
    }

    if (selCount===this.users.length){
      this.allSelected = true;
    } else{
      this.allSelected = false;
    }
  }

  checkAll(event:any){
    for(let i=0;i<this.users.length;i++){
      this.users[i].selected = event.target.checked === true ? true : false;
    }
  }

  getPage(page: number) {
    this.loading = true;
    this.api.getListData( { 
        url: this.url, order: this.order, orderBy: this.orderBy, page: page, pageSize: this.pageSize, search: this.search
      } )
    .subscribe((res: any) => {
      this.users = res.data;
      this.total = res.total;
      this.loading = false;
      this.p = page;
      if(res.total>0){
        this.usersFound = true;
      }
    });
  }

  sortData(orderBy: string) {
    this.loading = true;
    this.api.getListData({ 
      url: this.url, order: this.order === 'ASC' ? 'DESC' : 'ASC', orderBy: orderBy, page: 1, pageSize: this.pageSize, search: this.search
    })
    .subscribe((res: any) => {
      this.users = res.data;
      this.total = res.total;
      this.loading = false;
      this.p = 1;
      this.orderBy = orderBy;
      this.order = (this.order === 'ASC') ? 'DESC' : 'ASC';
    });
  }

  deleteRecord( id: number){
    this.api.delete({id:id, url: this.url}).subscribe((res: any) => {
      if (typeof res !== undefined && res !== '' && res.error === false) {
        swal.fire({
          type: 'success',
          title: 'Selected record has been deleted.',
          showConfirmButton: false,
          timer: 1500
        })
        this.ngOnInit();
      }
    });
  }

  deleteRecords() {
    if (this.selectedUsers.length <=0 ){
      swal.fire({
        title: 'OOPS!',
        text: 'Please select a row to delete.',
        type: 'error',
        confirmButtonText: 'Try Again'
      })

      return;
    }

    let obj = {
      ids: this.selectedUsers,
      url: this.url,
    };
    this.api.deleteRows(obj).subscribe((res: any) => {
      if (typeof res !== undefined && res !== '' && res.error === false) {
        swal.fire({
          type: 'success',
          title: 'Selected records has been deleted.',
          showConfirmButton: false,
          timer: 1500
        })
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.ts.setTitle('Users');
    this.getPage(1);
    this.selectedUsers = [];
  }
}
