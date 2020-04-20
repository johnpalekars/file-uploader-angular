import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  // Declearing Variables
  private currentUserSubject: BehaviorSubject<null>
  public currentUserID: BehaviorSubject<null>
  public isAdmin: boolean;
  private REST_API_SERVER = 'http://127.0.0.1:8000/'

  constructor(private http: HttpClient) {

    // Getting the value of current User from the local storage
    this.currentUserSubject = new BehaviorSubject<null>(
      JSON.parse(localStorage.getItem('currentUser')),
    )

    // Getting the id of logged in user for showing data that only he deserve to see
    this.currentUserID = new BehaviorSubject<null>(
      JSON.parse(localStorage.getItem('currentUserID')),
    )

    //  getting boolean value if user is admin or not
    this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
  }

  // func is used for checking if user already have credentials stored
  // on the localstorage
  public currentUserValue() {
    return this.currentUserSubject.value
  }

  // Service for log in the user 
  public login(value: any) {
    return this.http
      .post<any>(this.REST_API_SERVER + 'auth/token/login', value)
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.auth_token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user))
            this.currentUserSubject.next(user)
            console.log(this.currentUserSubject)
            console.log(value.username)

            // Calling the getID function for getting the ID of logged in user
            // for subsequent database calls to fetch data which is meant for that user
            this.getID(value).subscribe(data => {

              // storing the ID in local storage variable
              localStorage.setItem('currentUserID', JSON.stringify(data.ID))
              this.currentUserID.next(data.ID)

              // if User is Admin initialize the local storage variable
              localStorage.setItem('isAdmin', JSON.stringify(data.isAdmin))
              this.isAdmin = data.isAdmin
              console.log(this.currentUserID.value)
              console.log(this.isAdmin)
            })
          }

          return user
        }),
      )
  }

  // Getting the ID by passing username as argument 
  getID(value: string): Observable<any> {
    return this.http.post(this.REST_API_SERVER + 'getID/', value)
  }

  // function for returning the current user ID
  public currentID() {
    return this.currentUserID.value
  }

// Logout the user from system by calling this function
  logout() {

    // remove user information from local storage to log user out
    localStorage.removeItem('currentUser')
    localStorage.removeItem('currentUserID')
    localStorage.removeItem('isAdmin')

    // reasign local variables
    this.currentUserSubject.next(null)
    this.isAdmin = false
    this.currentUserID.next(null)

    // call logout API
    return this.http.post<any>(this.REST_API_SERVER + 'auth/token/logout', {})
  }
}
