import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-slider-images',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './slider-images.component.html',
  styleUrls: ['./slider-images.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderImagesComponent extends BaseComponent implements OnInit {
  bannerUrls?: any;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000, // Time in milliseconds between slides

    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: [
      '<i class="bi bi-chevron-compact-left flex items-center"></i>',
      '<i class="bi bi-chevron-compact-right flex items-center"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override loadOnline() {
    super.loadOnline();
    this.serviceApi.getBanners().subscribe({
      next: (res) => {
        if (res.status) {
          this.bannerUrls = res.banner_images;
        }
      },
      error: () => {
        this.showSnackBar('خطا در ارتباط با سرور لطفا دوباره تلاش کنید');
      }
    });
  }
}
