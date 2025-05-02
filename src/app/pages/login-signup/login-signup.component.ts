import { Component, HostBinding, HostListener, Injector, OnInit } from '@angular/core';
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

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.code == 'Enter') {
      event.preventDefault();
      this.onSubmitClicked();
    }
  }

  constructor(injector: Injector) {
    super(injector);
    this.mobile = '';
    this.token = '';
    this.mobileRegex =
      /^(?:(?:(?:\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/;
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onSubmitClicked() {
    if (!this.userId) {
      if (this.mobile && this.mobileRegex.test(this.mobile)) {
      // if (this.mobile) {
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
              this.res = response;
              this.userId = response?.user_id;
              localStorage.setItem(
                'userId',
                this.userId ? String(this.userId) : ''
              );
              this.isLoading = false;
            },
            error: (error: string) => {
              this.isLoading = false;

              this.showSnackBar('خطا در سیستم لطفا دوباره تلاش کنید')
            },
          });
      } else {
        this.showSnackBar('لطفا از صحیح بودن شماره وارد شده اطمینان حاصل فرمایید')
      }
    } else {
      if (this.res.status === 200) {
        if (this.token && this.token.length === 6) {
        // if (this.token) {
          this.isLoading = true;
          this.serviceApi
            .checkToken({
              token: this.token,
              user_id: this.userId,
            })
            .subscribe({
              next: (response: TokenResponse) => {
                this.isLoading = false;
                if (response.token) {
                  localStorage.setItem('token', response.token || '');
                  this.GlobalsService.isLoggedIn = true;
                  this.router.navigate(['']).then( () => {
                    window.location.reload();
                  });
                }
              },
              error: (error: string) => {
                this.isLoading = false;

                this.showSnackBar('خطا در سیستم لطفا دوباره تلاش کنید')
              },
            });
        } else {
          this.showSnackBar('لطفا از صحیح بودن کد وارد شده اطمینان حاصل فرمایید')
        }
      }
    }
  }

  convertPersianToEnglish(input: string): string {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    return input.replace(/[۰-۹]/g, (w) => englishNumbers[persianNumbers.indexOf(w)]);
  }

  protected readonly onkeyup = onkeyup;
}
