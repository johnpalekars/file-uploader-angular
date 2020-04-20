import { Component, OnInit, OnDestroy } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FileUploadServiceService } from '../_services/file-upload-service.service'
import { AuthenticationService } from '../_services/authentication.service'
import { NavigationEnd, Router } from '@angular/router'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit, OnDestroy {
  // ======== Declearing Required Variables =========
  title = 'file-uploader'

  // Variable for storing user id to know
  // which user has uploaded the files
  userID = null

  // variable for storing number of selected files
  fileCount = 0

  // var for refreshing the page afer succesful upload
  mySubscription: any

  // importing Math for formatting output
  math = Math

  // Variable for storing Files and fileInfo which are selected to upload
  data = {
    myFiles: [],
    file_info: [],
  }

  constructor(
    // Creating instances of services
    private router: Router,
    private _snackBar: MatSnackBar,
    private fileUploadService: FileUploadServiceService,
    private authenticationService: AuthenticationService,
  ) {
    //code for refreshing the component after upload
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false
    }

    //code for refreshing the component after upload
    this.mySubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false
      }
    })
  }

  ngOnDestroy(): void {
    //code for refreshing the component after upload
    if (this.mySubscription) {
      this.mySubscription.unsubscribe()
    }
  }

  ngOnInit() {
    // Defined the variable for storing userID of logged in user
    this.userID = this.authenticationService.currentID()
  }

  // catching files which are selected by the user
  // and storing in data variable along with info
  getFileDetails(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.data.myFiles.push(event.target.files[i])
      this.data.file_info.push({
        name: event.target.files[i].name,
        size: event.target.files[i].size,
      })
    }
  }

  // Uploading files by using Angular FormData
  uploadFiles() {
    const frmData = new FormData()
    frmData.append('id', this.userID)
    for (var i = 0; i < this.data.myFiles.length; i++) {
      frmData.append(this.data.file_info[i].name, this.data.file_info[i].size)
      console.log(this.userID)
      frmData.append(this.data.file_info[i].name, this.data.myFiles[i])
    }

    // Increasing file count as per files selected in formdata
    frmData.forEach((value, key) => {
      this.fileCount = this.fileCount + 1
      console.log(this.fileCount)
    })

    // check if there is a file attached to formdata or return error
    if (this.fileCount < 2) {
      this.fileCount = 0
      return this._snackBar.open('No File Selected', 'Ok', {
        duration: 3000,
      })
    }
    // Calling service uploadFiles and pass formdata as argument
    this.fileUploadService.uploadFiles(frmData).subscribe(
      data => {
        console.log(data)
        if (data['success']) {
          this._snackBar.open('Upload successful', 'ok', {
            duration: 6000,
          })

          // Unsubscribe the subscription for refreshing the component
          this.ngOnDestroy()
        }
      },
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => {
        console.log('done Uploading')
      },
    )
  }
}
