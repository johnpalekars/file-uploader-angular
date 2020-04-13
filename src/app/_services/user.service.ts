import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class UserService {
  private REST_API_SERVER = 'http://127.0.0.1:8000/'

  constructor(private http: HttpClient) {}

  public register(user) {
    return this.http.post(this.REST_API_SERVER + 'auth/users/', user)
  }

  public userInfo(): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'auth/users/me/')
  }

  public userEdit(user): Observable<any> {
    return this.http.put(this.REST_API_SERVER + 'auth/users/me/', user)
  }
}
