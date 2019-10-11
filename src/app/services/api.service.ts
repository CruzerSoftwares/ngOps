/**
 * Define all the aplication level functions
 *
 * @category ACL
 * @package ManageACL
 * @author RN Kushwaha <ram.kushwaha@cardekho.com>
 * @copyright CARDEKHO
 * @version 1.0.0
 * @since version 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  apiUrl = '';

  constructor(private http: HttpClient, private env: EnvService) {
    this.apiUrl = this.env.apiUrl;
  }

  makeRequest(obj) {
    if(obj.method=='post'){
      return this.http.post(`${this.apiUrl}${obj.url}`, obj.data);
    }
    if(obj.method=='put'){
      return this.http.put(`${this.apiUrl}${obj.url}`, obj.data);
    }
    
    let dataStr = '';
    if (typeof obj.data !== undefined) {
      for (var key in obj.data) {
        if (obj.data.hasOwnProperty(key)) {
          if (obj.data[key]) {
            dataStr += '&' + key + '=' + encodeURIComponent(obj.search[key]);
          }
        }
      }
    }

    return this.http.get(`${this.apiUrl}${obj.url}?${dataStr}`);
  }
  
  getListData(obj) {
    let searchStr = '';
    if(typeof obj.search !== undefined ){
      for (var key in obj.search) {
        if (obj.search.hasOwnProperty(key)) {
          if(obj.search[key]){
            searchStr+= '&search[' + key + ']=' + encodeURIComponent(obj.search[key]);
          }
        }
      }
    }
    return this.http.get(`${this.apiUrl}${obj.url}?order=${obj.order}&orderBy=${obj.orderBy}&pageSize=${obj.pageSize}&page=${obj.page}${searchStr}`);
  }

  getSingle(obj) {
    return this.http.get<any>(`${this.apiUrl}${obj.url}/${obj.id}`);
  }
  
  getDropdownList(obj) {
    return this.http.get(`${this.apiUrl}${obj.url}/list`);
  }

  delete(obj) {
    return this.http.delete(`${this.apiUrl}${obj.url}/${obj.id}`);
  }
  
  deleteRows(obj) {
    return this.http.post(`${this.apiUrl}${obj.url}/deleterows`, obj);
  }

  update(obj) {
    return this.http.put<any>(`${this.apiUrl}${obj.url}/${obj.id}`, obj);
  }

  save(obj) {
    return this.http.post<any>(`${this.apiUrl}${obj.url}`, obj);
  }

}
