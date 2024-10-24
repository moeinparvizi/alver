import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { SliderImagesComponent } from '../../components/slider-images/slider-images.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from '../../components/card/card.component';
import { GetProductsService } from '../../services/getProducts/get-products.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    SliderImagesComponent,
    CarouselModule,
    MatButtonModule,
    CardComponent,
    SpinnerComponent,
  ],
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
  amazingProducts?: any[];

  isLoading = true;

  constructor(
    injector: Injector,
    private getProductsService: GetProductsService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override loadOnline(): void {
    super.loadOnline();
    this.getProductsService.getProducts().subscribe({
      next: ({ products, isLoading }) => {
        this.products = products;
        this.isLoading = isLoading;
      },
      error: err => {
        console.error('Error fetching products:', err);
        this.isLoading = false;
      },
    });

    this.getProductsService.getAmazingProducts().subscribe({
      next: ({ amazingProducts, isLoading }) => {
        this.amazingProducts = amazingProducts;
        this.isLoading = isLoading;
      },
      error: err => {
        console.error('Error fetching products:', err);
        this.isLoading = false;
      },
    });
  }
}
