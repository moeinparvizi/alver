import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  styleUrl: './footer.component.scss',
  templateUrl: './footer.component.html',
})
export class FooterComponent extends BaseComponent implements OnInit {
  isLoading?: boolean = false;
  info?: any;

  constructor(injector: Injector) {
    super(injector);
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
        this.showSnackBar('بستن');
      },
    });
  }
}

