import { Component, OnInit } from '@angular/core'
import { UserService } from '../_services/user.service'
import { Subject, BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  // this variable stores the null or 1 of the
  // toggle between user info and user edit table
  edit = null

  // This Object is used to store the user information
  // which is going to display on userInfo table
  private UserInfo = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
  }

  // This Object is used to store the user information
  // which is going to change in order to users request
  UserEdit = {
    first_name: '',
    last_name: '',
    email: '',
  }

  constructor(
    // Creating the instance of userService
    private userService: UserService
    
  ) { }

  ngOnInit() {
    // Calling the userData() function to show
    // data when the Component Loads
    this.userData()
  }

  userData() {
    // Method used for storing data in the local variables
    this.userService.userInfo().subscribe(
      data => {
        this.UserInfo.first_name = data.first_name
        this.UserInfo.last_name = data.last_name
        this.UserInfo.username = data.username
        this.UserInfo.email = data.email
        this.UserEdit.first_name = data.first_name
        this.UserEdit.last_name = data.last_name
        this.UserEdit.email = data.email
        console.log(this.UserInfo)
      },
      err => {
        console.log('error')
      },
    )
  }

  userEditChange() {
    // method used for toggling between tables
    if (this.edit == null) {
      this.edit = 1
    } else if (this.edit == 1) {
      this.edit = null
    }
    console.log(this.edit)
    console.log(this.UserEdit)
  }

  userEdit() {
    
    // method for reflecting the changed data into the dataBase
    console.log(this.UserEdit)
    this.userService.userEdit(this.UserEdit).subscribe(
      data => {
        this.UserInfo = data
      },
      err => {
        console.log('error')
      },
    )
    this.userEditChange()
  }
}
