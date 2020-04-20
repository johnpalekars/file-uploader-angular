import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class UserService {
  // declearing the API endpoint
  private REST_API_SERVER = 'http://127.0.0.1:8000/'

  constructor(private http: HttpClient) {}

  // Creating Service for registering user into system
  public register(user: any) {
    return this.http.post(this.REST_API_SERVER + 'createUser/', user)
  }

  // Creating Service for showing userInformation
  public userInfo(): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'auth/users/me/')
  }

  // Creating Service for Editing User information
  public userEdit(user: any): Observable<any> {
    return this.http.put(this.REST_API_SERVER + 'auth/users/me/', user)
  }

  // Creating Service for data required by Admin of the system
  // this service only called when user is Admin otherwise retun error
  public adminUsers(): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'AdminUser/')
  }
}
