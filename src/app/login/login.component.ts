import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenServiceService } from '../share/service/token-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    login$: Observable<boolean> | undefined;
    public form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private snackbar: MatSnackBar,
        private router: Router
    ) { }


    ngOnInit() {

        this.login$ = this.userService.getLoginStatus();

        this.login$.subscribe(
            res =>  {
                if(res) this.router.navigate(['/image/list']);
            }
        )

        this.form = this.fb.group({
            username: ['', Validators.pattern('^[a-zA-Z0-9-_]{5,20}')],
            password: ['', Validators.pattern('^[a-zA-Z0-9-_]{5,20}')],
            rememberMe: [true]
        })
    }
    get username() { return this.form.get('username'); }
    get password() { return this.form.get('password'); }
    get rememberMe() { return this.form.get('rememberMe') }

    login() {
      this.userService.login(this.form.value)
      .subscribe(res => {
          if (res) {
              this.snackbar.open('登入成功', 'OK', { duration: 3000});
          } else {
              this.snackbar.open('請檢查使用者名稱及密碼', 'OK', {duration: 3000});
          }
      },
         err => {
            this.snackbar.open('請檢查使用者名稱及密碼', 'ERROR', {duration: 3000});
         }
      );
    }
}
