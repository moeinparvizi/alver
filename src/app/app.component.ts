import { serviceApi } from './network/service/service.api';
import { Component, OnInit } from '@angular/core';
import { Config } from './common/config';
import { HomeComponent } from './pages/home/home.component';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from "./components/spinner/spinner.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [HomeComponent, RouterOutlet, SpinnerComponent],
})
export class AppComponent implements OnInit {
  title = 'alver';
  protected readonly Config = Config;
  public static serviceApi: serviceApi;
  isLoading = false;

  constructor(private serviceApi: serviceApi) {}

  ngOnInit(): void {
    this.isLoading = true;
    if (localStorage.getItem('token')) {
      this.serviceApi.isLogIn().subscribe({
        next: () => {
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.isLoading = false;
    }
  }
}
