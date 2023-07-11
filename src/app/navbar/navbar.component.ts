import { Component, OnInit } from '@angular/core';
import { Observable,of } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../user/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  login$: Observable<boolean> | undefined;
  user$: Observable<User | null> | undefined;
  userAccountID? : string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.login$ = this.userService.getLoginStatus();
    this.user$ = this.userService.getCurrentUser();

    this.user$.subscribe(res => this.userAccountID = res?.username);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
