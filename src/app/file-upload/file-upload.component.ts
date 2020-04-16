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
  title = 'file-uploader'
  message2 = 'No File Selected'
  userID = null
  fileCount = 0
  mySubscription: any
  math = Math
  data = {
    myFiles: [],
    file_info: [],
  }

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private fileUploadService: FileUploadServiceService,
    private authenticationService: AuthenticationService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false
    }

    this.mySubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false
      }
    })
  }

  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe()
    }
  }

  ngOnInit() {
    this.userID = this.authenticationService.currentID()
  }

  getFileDetails(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.data.myFiles.push(event.target.files[i])
      this.data.file_info.push({
        name: event.target.files[i].name,
        size: event.target.files[i].size,
      })
    }
  }

  uploadFiles(message = 'Upload Successful', action = 'ok') {
    const frmData = new FormData()
    frmData.append('id', this.userID)
    for (var i = 0; i < this.data.myFiles.length; i++) {
      frmData.append(this.data.file_info[i].name, this.data.file_info[i].size)
      console.log(this.userID)
      frmData.append(this.data.file_info[i].name, this.data.myFiles[i])
    }

    frmData.forEach((value, key) => {
      this.fileCount = this.fileCount + 1
      console.log(this.fileCount)
    })
    if (this.fileCount < 2) {
      this.fileCount = 0
      return this._snackBar.open(this.message2, action, {
        duration: 3000,
      })
    }

    this.fileUploadService.file_upload(frmData).subscribe(
      data => {
        console.log(data)
        if (data['success']) {
          this._snackBar.open(message, action, {
            duration: 6000,
          })

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
