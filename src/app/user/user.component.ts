import { Component, OnInit } from '@angular/core'
import { UserService } from '../_services/user.service'
import { Subject, BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  edit = null

  private UserInfo = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
  }

  UserEdit = {
    first_name: '',
    last_name: '',
    email: '',
  }

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userData()
  }

  userData() {
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
    if (this.edit == null) {
      this.edit = 1
    } else if (this.edit == 1) {
      this.edit = null
    }
    console.log(this.edit)
    console.log(this.UserEdit)
  }

  userEdit() {
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
