import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {


  private REST_API_SERVER = "http://127.0.0.1:8000/";

  constructor(private httpClient: HttpClient) { }

  public file_upload(formData: FormData): Observable<any> {
    return this.httpClient.post(this.REST_API_SERVER+"upload/", formData);
  }

  public download(value: null): Observable<any> {
    return this.httpClient.post(this.REST_API_SERVER + "download/",value);
  }

  public file_delete(value: any): Observable<any> {
    return this.httpClient.post(this.REST_API_SERVER + "fileDelete/",value);
  }

}
