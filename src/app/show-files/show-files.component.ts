import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FileUploadServiceService } from '../_services/file-upload-service.service'
import { AuthenticationService } from '../_services/authentication.service'
import { MatSnackBar } from '@angular/material/snack-bar'


@Component({
  selector: 'app-show-files',
  templateUrl: './show-files.component.html',
  styleUrls: ['./show-files.component.css'],
})
export class ShowFilesComponent implements OnInit {
  files: string[] = []
  math = Math
  selection: string[] = []
  deleteAllFiles: string[] = []

  


  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private fileUploadService: FileUploadServiceService,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {

    this.show_data()
  }
  
  show_data() {
    console.log(this.authenticationService.currentID())
    this.fileUploadService.download(this.authenticationService.currentID()).subscribe(data => {
      for (const key in data) {
        if (key === 'success') {
          this.files = data.success
        } else {
          console.log('error')
        }
      }
    })
  }


  selectAll()
  {

    for (let file in this.files)
      {
      this.deleteAllFiles.push(this.files[file]['id'])
      }
  }


  onSelect(value: any) {
    console.log(value)
    if (this.selection.includes(value)) {
      this.selection.splice(this.selection.indexOf(value), 1);
    }
    else {
      this.selection.push(value)
    }
    
  }

  deleteFile() {
    if (this.selection.length === 0) {
      return this._snackBar.open('No file selected', 'ok', {
        duration: 3000,
      });
    }
    else {
      this.fileUploadService.file_delete(this.selection).subscribe(data => {
        for (const key in data) {
          if (key === 'success') {
            console.log(data.success)
            this.selection = [];
            this.ngOnInit();
          } else {
            console.log('error')
          }
        }
      })
    }
    
  }

  deleteAll() {
    this.selectAll()
    if (this.deleteAllFiles.length === 0) {
      return this._snackBar.open('No file selected', 'ok', {
        duration: 3000,
      });
    }
    else {
      this.fileUploadService.file_delete(this.deleteAllFiles).subscribe(data => {
        for (const key in data) {
          if (key === 'success') {
            this.selection = [];
            this.deleteAllFiles = [];
            this.ngOnInit();
          } else {
            console.log('error')
          }
        }
      })
    }
  }
}
