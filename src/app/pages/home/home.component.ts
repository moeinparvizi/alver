import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { SliderImagesComponent } from '../../components/slider-images/slider-images.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatButtonModule } from '@angular/material/button';
import { GetProducts } from '../../models/service.model';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [SliderImagesComponent, CarouselModule, MatButtonModule, CardComponent],
})
export class HomeComponent extends BaseComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000, // Time in milliseconds between slides

    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 900,
    navText: [
      '<i class="bi bi-chevron-compact-left flex items-center"></i>',
      '<i class="bi bi-chevron-compact-right flex items-center"></i>',
    ],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 5,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  products?: any[];

  isLoading = true;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadOnline();
  }

  override loadOnline(): void {
    super.loadOnline();
    this.isLoading = true;
    this.serviceApi.getProducts().subscribe({
      next: (res: GetProducts) => {
        this.products = res.products;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snakeBar.show(err, 'بستن', 3000, 'custom-snackbar');
      },
    });
  }
}
