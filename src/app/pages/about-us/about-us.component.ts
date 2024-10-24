import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent extends BaseComponent implements OnInit {
  info?: any;
  isLoading = false;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override loadOnline() {
    super.loadOnline();
    this.isLoading = true;
    this.serviceApi.getAboutUs().subscribe({
      next: (res: any) => {
        this.info = res.data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snakeBar.show(err, 'بستن', 3000, 'custom-snackbar');
      },
    });
  }
}
