import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginResponse, TokenResponse } from '../../models/data.response';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SpinnerComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss',
})
export class LoginSignupComponent extends BaseComponent implements OnInit {
  errorMessage: string | null = null;
  mobile: string;
  res: LoginResponse = {};
  userId: number | undefined;
  token: string;
  isLoading = false;
  mobileRegex: RegExp;

  constructor(injector: Injector) {
    super(injector);
    this.mobile = '';
    this.token = '';
    this.mobileRegex = /^(?:(?:(?:\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/;
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onSubmitClicked() {
    console.log(this.mobile);
    if (!this.userId) {
      if (this.mobile && this.mobileRegex.test(this.mobile)) {
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
        this.snakeBar.show(
          'لطفا از صحیح بودن شماره وارد شده اطمینان حاصل فرمایید',
          'بستن',
          3000,
          'custom-snackbar'
        );
      }
    } else {
      if (this.res.status === 200) {
        if (this.token && this.token.length === 6) {
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
        } else {
          this.snakeBar.show(
            'لطفا از صحیح بودن کد وارد شده اطمینان حاصل فرمایید',
            'بستن',
            3000,
            'custom-snackbar'
          );
        }
      }
    }
  }
}
