/**
 * All the things necessary to authenticate the app
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
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnvService } from './env.service';
import { User } from '../models/User';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    apiUrl = '';
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private env: EnvService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.apiUrl = this.env.apiUrl + 'auth';
    }

    isLoggedIn(): boolean{
        let token = localStorage.getItem('currentUser');
        if(token == null ) return false;

        return true;
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
   
    currentUserID(): number {
        return this.currentUserSubject.value.id;
    }
    
    currentUserRole(): number {
        return this.currentUserSubject.value.role_id;
    }

    register(obj) {
        return this.http.post<any>(`${this.apiUrl}/register`, obj);
    }

    login(obj) {
        return this.http.post<any>(`${this.apiUrl}/login`, obj)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}