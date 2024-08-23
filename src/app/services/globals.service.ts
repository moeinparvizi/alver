import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  public userToken: string | null = null;
  public isLoggedIn = false;
  public userName = '';

  constructor() {}

  setUserToken(token: string | null): void {
    this.userToken = token;
  }

  getUserToken(): string | null {
    return this.userToken;
  }

  clearUserToken(): void {
    this.userToken = null;
  }
}
