import { Component } from '@angular/core'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'file-uploader'

  constructor() {}

  ngOnInit() {}

  //  getFileDetails(event) {
  //   this.myFiles = event.target.files
  //   console.log(this.myFiles[0])
  // }

  // uploadFiles() {
  //   const frmData = new FormData()
  //   for (var i = 0; i < this.myFiles.length; i++) {
  //     const file  = this.myFiles[i]
  //     frmData.append('username', this.username)
  //     frmData.append(file[name], file)
  //     console.log(file[name])
  //   }
}
