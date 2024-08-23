import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginResponse, TokenResponse } from '../../models/data.response';
import { SpinnerComponent } from "../../components/spinner/spinner.component";

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss',
})
export class LoginSignupComponent extends BaseComponent implements OnInit {
  errorMessage: string | null = null;
  mobile: string;
  res: LoginResponse = {};
  userId: number| undefined;
  token: string;
  isLoading = false;

  constructor(injector: Injector) {
    super(injector);
    this.mobile = '';
    this.token = ''
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onSubmitClicked() {
    if (!this.userId) {
      if (this.mobile) {
        this.isLoading = true;
        this.serviceApi
          .registriation({
            mobile: this.mobile,
          })
          // .pipe(
          //   catchError(error => {
          //     this.errorMessage = 'Login failed. Please try again.';
          //     return throwError(error);
          //   })
          // )
          .subscribe({
            next: (response: LoginResponse) => {
              console.log('Login successful', response);
              this.res = response;
              this.userId = response?.user_id;
              this.isLoading = false;
            },
          });
      } else {
        console.log('fill mobile number fields');
      }
    } else {
      if (this.res.status === 200) {
        this.isLoading = true;
        this.serviceApi
          .checkToken({
            token: this.token,
            user_id: this.userId,
          })
          .subscribe((response: TokenResponse) => {
            localStorage.setItem('token', response.token || '');
            this.isLoading = false;
            if (response.token) {
              // this.router.navigate(["/home"]);
            }
          });
      }
    }
  }
}
