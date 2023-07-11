import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  private tokenKey = 'jwtToken';

  constructor(private sessionStorage: SessionStorageService) {}

  // 存储令牌
  storeToken(token: string): void {
    this.sessionStorage.store(this.tokenKey, token);
  }

  // 检索令牌
  getToken(): string {
    return this.sessionStorage.retrieve(this.tokenKey);
  }

  // 清除令牌
  clearToken(): void {
    this.sessionStorage.clear(this.tokenKey);
  }

}
