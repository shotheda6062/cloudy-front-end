import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ImageItem } from 'src/app/models/image-item';
import { AppConfig } from 'src/app/share/app.config';
import { TokenServiceService } from 'src/app/share/service/token-service.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig,
    private tokenService : TokenServiceService) { }


  getlist() : Observable<ImageItem[]> {

    const token : string = this.tokenService.getToken();

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.post<ImageItem[]>('/file/getFileList' ,null , {headers});

  }

  uploadFileSever(file: File) : Observable<Response> {

    const token : string = this.tokenService.getToken();

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    const formData: FormData = new FormData();

    formData.append('file', file, file.name);

    return this.http.post<Response>('/file/upload',formData,{headers});

  }

  upload(file:File) : Observable<boolean> {
    return this.uploadFileSever(file).pipe(map(
                                                (res) => {return true}
                                               ,(err:HttpErrorResponse) => {return false}
                                          ));
  }


   donwload(fileInfo: { fileName: string; originFileName: string; }) : Observable<Blob>{

    const token : string = this.tokenService.getToken();

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token)
                                     ;

    return this.http.post("/file/getfile", fileInfo, { headers,responseType: 'blob' });
   }



}
