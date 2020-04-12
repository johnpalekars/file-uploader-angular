import { Component, OnInit } from '@angular/core'

import { FileUploadServiceService } from '../_services/file-upload-service.service'
import { AuthenticationService } from '../_services/authentication.service'

@Component({
  selector: 'app-show-files',
  templateUrl: './show-files.component.html',
  styleUrls: ['./show-files.component.css'],
})
export class ShowFilesComponent implements OnInit {
  download_data: string[] = []
  math = Math

  constructor(
    private fileUploadService: FileUploadServiceService,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {}

  show_data() {
    console.log(this.authenticationService.currentID())
    this.fileUploadService.download(this.authenticationService.currentID()).subscribe(data => {
      for (const key in data) {
        if (key === 'success') {
          this.download_data = data.success
        } else {
          console.log('error')
        }
      }
    })
  }
}
