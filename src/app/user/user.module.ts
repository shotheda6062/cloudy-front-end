import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ShareModule } from '../share/share.module';
import { LoginComponent } from '../login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './service/user.service';
import { RegisterComponent } from '../register/register.component';


@NgModule({
  declarations: [LoginComponent,RegisterComponent],
  providers: [UserService],
  imports: [
    CommonModule,
    UserRoutingModule,
    ShareModule,
    HttpClientModule
  ]
})
export class UserModule { }
