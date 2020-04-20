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
  // Declearing variable for storing information
  // about files which is coming from server
  files: string[] = []

  // Importing Math for formating the output
  math = Math

  // Array of string for storing the id of file which are selected
  selection: string[] = []

  // Storing id's of all the user files
  deleteAllFiles: string[] = []

  constructor(
    // Creating instaces of services
    private router: Router,
    private _snackBar: MatSnackBar,
    private fileUploadService: FileUploadServiceService,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {
    // Showing files on ngOnInit
    this.show_data()
  }

  show_data() {
    // Calling Service getFiles for getting user's files
    console.log(this.authenticationService.currentID())
    this.fileUploadService
      .getFiles(this.authenticationService.currentID())
      .subscribe(data => {
        for (const key in data) {
          if (key === 'success') {
            this.files = data.success
          } else {
            console.log('error')
          }
        }
      })
  }

  selectAll() {
    // Getting id's of all the files from files variable
    for (let file in this.files) {
      this.deleteAllFiles.push(this.files[file]['id'])
    }
  }

  onSelect(value: any) {
    // Getting Id of the selected file which are shown on
    // html file and storing in selection var
    // And toggle between select and unselect file
    console.log(value)
    if (this.selection.includes(value)) {
      this.selection.splice(this.selection.indexOf(value), 1)
    } else {
      this.selection.push(value)
    }
  }

  deleteFile() {
    // deleting the selected files
    if (this.selection.length === 0) {
      // if No file No chosen
      return this._snackBar.open('No file selected', 'ok', {
        duration: 3000,
      })
    } else {
      // if files are chosen, call file_delete service and detele files stored in
      // selection variable
      this.fileUploadService.deleteFiles(this.selection).subscribe(data => {
        for (const key in data) {
          if (key === 'success') {
            console.log(data.success)

            // making selection variable empty for further selections
            // because if we delete files which are deleted can cause errors
            this.selection = []

            // Refreshing the component for showing updated list of files
            this.ngOnInit()
          } else {
            console.log('error')
          }
        }
      })
    }
  }

  deleteAll() {
    // delete all the files of the user

    // selecting all the files by calling func selectAll
    this.selectAll()

    // if No file No chosen
    if (this.deleteAllFiles.length === 0) {
      return this._snackBar.open('No file selected', 'ok', {
        duration: 3000,
      })
    } else {
      // deleting files by calling file_delete() and passing id's of files
      // which are going to be deleted
      this.fileUploadService
        .deleteFiles(this.deleteAllFiles)
        .subscribe(data => {
          for (const key in data) {
            if (key === 'success') {
              // emptied the selected files
              this.selection = []

              // empmtied the selected files
              this.deleteAllFiles = []

              // Refreshing the component for showing updated list of files
              this.ngOnInit()
            } else {
              console.log('error')
            }
          }
        })
    }
  }
}
