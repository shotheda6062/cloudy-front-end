import { ImageItem } from './../models/image-item';
import { Component } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, delay } from 'rxjs';
import { UserService } from '../user/service/user.service';
import { Router } from '@angular/router';
import { ImageService } from '../image/service/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent {

  login$: Observable<boolean> | undefined;

  selectedFile : File | null = null;

  displayedImages$: BehaviorSubject<ImageItem[]> = new BehaviorSubject<ImageItem[]>([]);

  constructor(
    private userService: UserService,
    private router: Router,
    private imageService : ImageService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {

    this.displayedImages$.subscribe((res) => {
     return res;
    });

    this.login$ = this.userService.getLoginStatus();

    this.login$.subscribe(
      res =>  {
                if(!res) this.router.navigate(['/']);
              }
      )

    this.loadImages();

  }

  loadImages() {
    this.imageService.getlist().subscribe( res => {
        this.displayedImages$.next(res);
    });
  }

  getImageDataUrl(imageData: string): string {
    return `data:image/jpeg;base64,${imageData}`;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {

      this.imageService.upload(this.selectedFile).subscribe(

        async (res) => {
            this.snackbar.open('上傳成功', 'OK', { duration: 3000});
            this.selectedFile = null;
            setTimeout(() => {this.loadImages();},3000)

          }

      )

    }
  }

  downloadFile(fileName : string, originFileName : string) {

    const fileInfo = {  "fileName" : fileName
                      , "originFileName" : originFileName}

    this.imageService.donwload(fileInfo).subscribe(
      (response) => {
        this.saveFile(response, originFileName);
      },
      (error) => {
        console.error('Error downloading file:', error);
      }
    )

  }

  saveFile(response: any, fileName: string) {
    const blob = new Blob([response], { type: 'application/octet-stream' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.click();
  }

}
