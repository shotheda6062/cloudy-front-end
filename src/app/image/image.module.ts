import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageRoutingModule } from './image-routing.module';
import { ShareModule } from '../share/share.module';
import { ImageListComponent } from '../image-list/image-list.component';
import { ImageService } from './service/image.service';


@NgModule({
  declarations: [ImageListComponent],
  providers: [ImageService],
  imports: [
    CommonModule,
    ImageRoutingModule,
    ShareModule
  ]
})
export class ImageModule { }
