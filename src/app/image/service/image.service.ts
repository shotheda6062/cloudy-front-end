import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

    return this.http.post<ImageItem[]>('/getFileList' ,null , {headers});

  }



}
