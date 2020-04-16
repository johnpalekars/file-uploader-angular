import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service'
import { Routes, RouterModule,Router } from '@angular/router'
import { FileUploadServiceService } from '../_services/file-upload-service.service'
import {UserService} from '../_services/user.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  math = Math

  files : [];
  isAdmin: boolean;
  users : [];

  constructor(
    private fileUploadService: FileUploadServiceService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router:Router
  ) {
    
    this.isAdmin = authenticationService.isAdmin.value

  }

  

  ngOnInit() {

  }


  show_users() {

    this.userService.adminUsers().subscribe((users) => {
      for (const key in users) {
        if (key === 'success') {
          this.users = users.success
        } else {
          console.log('error')
        }
      }
    })
    

  }

  show_files(value: any) {
    this.fileUploadService.download(value).subscribe((files) => {
      this.files = [];
        for (const key in files) {
        if (key === 'success') {
          this.files = files.success
        } else {
          console.log('error')
        }
      }
    });

  }



}
