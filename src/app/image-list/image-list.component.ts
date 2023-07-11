import { ImageItem } from './../models/image-item';
import { Component } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserService } from '../user/service/user.service';
import { Router } from '@angular/router';
import { ImageService } from '../image/service/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent {

  user$: Observable<User | null> | undefined;
  login$: Observable<boolean> | undefined;

  selectedFile : File | null = null;

  displayedImages: ImageItem[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private imageService : ImageService
  ) { }

  ngOnInit() {

    this.login$ = this.userService.getLoginStatus();

        this.login$.subscribe(
            res =>  {
                if(res) this.router.navigate(['/']);
            }
        )

    this.user$ = this.userService.getCurrentUser();

    this.user$.subscribe(
        res => {
          this.loadImages();
        }
    )


  }

  loadImages() {
    this.imageService.getlist().subscribe( res => {
        this.displayedImages = res;
    });
    // 使用帳號資訊呼叫 API 取得圖片清單
    // 並將結果指派給 displayedImages 屬性
  }

  getImageDataUrl(imageData: Uint8Array): string {
    const base64String = btoa(String.fromCharCode(...imageData));
    return `data:image/jpeg;base64,${base64String}`;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      // 執行上傳檔案的邏輯，例如使用 FormData 或透過 API 進行上傳
      // 在上傳完成後，重新載入圖片清單
      this.selectedFile = null;
      this.loadImages();
    }
  }


}
