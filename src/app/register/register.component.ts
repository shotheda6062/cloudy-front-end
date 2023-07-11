import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public form!: FormGroup;

  constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private snackbar: MatSnackBar
  ) { }


  ngOnInit() {
      this.form = this.fb.group({
          username: ['', Validators.pattern('^[a-zA-Z0-9-_]{5,20}')],
          password: ['', Validators.pattern('^[a-zA-Z0-9-_]{5,20}')],
      })
  }
  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

  register() {
    this.userService.register(this.form.value)
    .subscribe(res => {
        if (res) {
            this.snackbar.open('註冊成功', 'OK', { duration: 3000});
        } else {
            this.snackbar.open('請檢查使用者名稱及密碼', 'OK', {duration: 3000});
        }
    }
       , err => {this.snackbar.open('註冊失敗', 'ERROR', {duration: 3000});})
  }
}
