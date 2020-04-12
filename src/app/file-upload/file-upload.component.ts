import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FileUploadServiceService } from '../_services/file-upload-service.service'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  title = 'file-uploader'

  constructor(
    private _snackBar: MatSnackBar,
    private fileUploadService: FileUploadServiceService,
  ) {}

  math = Math

  file_info = {
    name: '',
    size: '',
  }

  data = {
    myFiles: [],
    username: '',
    ok: [],
    file_info: [],
  }

  ngOnInit() {}

  getFileDetails(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.data.myFiles.push(event.target.files[i])
      this.data.file_info.push({
        name: event.target.files[i].name,
        size: event.target.files[i].size,
      })
    }
  }

  uploadFiles(message = 'Uploaded Successful', action = 'ok') {
    const frmData = new FormData()

    for (var i = 0; i < this.data.myFiles.length; i++) {
      frmData.append('username', this.data.username)
      frmData.append(this.data.file_info[i].name, this.data.myFiles[i])
    }

    this.fileUploadService.file_upload(frmData).subscribe(data => {
      for (const i in data) {
        this.data.ok.push(i)
      }
    })
    console.log(this.data.ok)
    this._snackBar.open(message, action, {
      duration: 4000,
    })
  }
}
