import { Component } from '@angular/core';
import { Config } from './common/config';
import { HomeComponent } from './pages/home/home.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [HomeComponent, RouterOutlet],
})
export class AppComponent {
  title = 'alver';
  protected readonly Config = Config;

  // public static serviceApi: serviceApi;

  constructor() {
    // AppComponent.serviceApi = serviceApi;
    // AppComponent.serviceApi
    //   .getMyLoginInfo()
    //   .subscribe((res: DataResponse<any>) => {
    //     if (res.success) {
    //       Config.siteName = res.data?.Title;
    //     }
    //   });
  }
}
