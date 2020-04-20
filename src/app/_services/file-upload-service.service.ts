import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {


  private REST_API_SERVER = "http://127.0.0.1:8000/";

  constructor(private httpClient: HttpClient) { }

  // Calling the API upload and passing the Object as a argument
  public uploadFiles(formData: FormData): Observable<any> {
    return this.httpClient.post(this.REST_API_SERVER+"upload/", formData);
  }

  // Calling the API download and passing the id as a argument
  public getFiles(value: null): Observable<any> {
    return this.httpClient.post(this.REST_API_SERVER + "download/",value);
  }

  // Calling the API fileDelete and passing the id's as a argument
  public deleteFiles(value: any): Observable<any> {
    return this.httpClient.post(this.REST_API_SERVER + "fileDelete/",value);
  }

}
