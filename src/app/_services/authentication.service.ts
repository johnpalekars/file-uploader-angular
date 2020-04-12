import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {    
    private currentUserSubject: BehaviorSubject<null>;
    public currentUser: Observable<null>;
    private REST_API_SERVER = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<null>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public  currentUserValue(){
        return this.currentUserSubject.value;
    }

    login(value) {
        
        return this.http.post<any>(this.REST_API_SERVER+"auth/token/login", value)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.auth_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    console.log(this.currentUserSubject)
                }

                return user;
            }));
    }

    logout() {
    // remove user from local storage to log user out
        
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        return this.http.post<any>(this.REST_API_SERVER+"auth/token/logout",{})
    }
}