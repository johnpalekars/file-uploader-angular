import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FileUploadServiceService } from '../_services/file-upload-service.service'
import { AuthenticationService } from '../_services/authentication.service'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {

  title = 'file-uploader'
  message2 = 'No File Selected'
  userID = null
  fileCount = 0

  constructor(
    private _snackBar: MatSnackBar,
    private fileUploadService: FileUploadServiceService,
    private authenticationService: AuthenticationService,
  ) {}

  math = Math

  data = {
    myFiles: [],
    file_info: [],
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
      this.fileCount = 0;
      return this._snackBar.open(this.message2, action, {
            duration: 6000,
          })
    }

  
    this.fileUploadService.file_upload(frmData).subscribe(
      data => {
        console.log(data)
        if (data['success']) {
          this._snackBar.open(message, action, {
            duration: 6000,
          })
        }
      },
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done Uploading') 
    )
  }
}
