import { Component, OnInit } from '@angular/core'

import { FileUploadServiceService } from '../_services/file-upload-service.service'

@Component({
  selector: 'app-show-files',
  templateUrl: './show-files.component.html',
  styleUrls: ['./show-files.component.css'],
})
export class ShowFilesComponent implements OnInit {
  download_data: string[] = []

  constructor(private fileUploadService: FileUploadServiceService) {}

  ngOnInit() {}

  show_data() {
    this.fileUploadService.download().subscribe(data => {
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
