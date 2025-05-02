import { AfterViewInit, Component, ElementRef, Injector, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { SliderImagesComponent } from '../../components/slider-images/slider-images.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from '../../components/card/card.component';
import { GetProductsService } from '../../services/getProducts/get-products.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { CategoryResponse } from '../../models/data.response';
import { NgIf } from '@angular/common';
import { Config } from '../../common/config';

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
    NgIf,
  ],
})
export class HomeComponent extends BaseComponent implements OnInit {
  // customOptions: OwlOptions = {
  //   loop: true,
  //   autoplay: true,
  // autoplayTimeout: 4000, // Time in milliseconds between slides

  // mouseDrag: true,
  // touchDrag: true,
  // pullDrag: false,
  // dots: true,
  // navSpeed: 1000,
  //   navText: [
  //     '<i class="bi bi-chevron-compact-left flex items-center"></i>',
  //     '<i class="bi bi-chevron-compact-right flex items-center"></i>',
  //   ],
  //   responsive: {
  //     0: {
  //       items: 2,
  //     },
  //     400: {
  //       items: 2,
  //     },
  //     740: {
  //       items: 4,
  //     },
  //     940: {
  //       items: 5,
  //     },
  //   },
  //   nav: true,
  // };

  products?: any = [];
  amazingProducts?: any = [];
  categories?: any = [];
  isImageLoading = true;

  isLoading = true;

  @ViewChild('cardProducts') cardProducts!: ElementRef;


  constructor(
    injector: Injector,
    private getProductsService: GetProductsService,
  ) {
    super(injector);

    this.serviceApi.cardTotalItems().subscribe({
      next: (res: any) => {
        if (res.status) {
          Config.basketCount = res.total_items;
        }
      },
    });
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

    this.isLoading = true;

    this.serviceApi.getCategories().subscribe({
      next: (res: CategoryResponse) => {
        this.categories = res.categories;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.showSnackBar('خطا در سیستم لطفا دوباره تلاش کنید')
      },
    });
  }

  onImageLoad(): void {
    this.isImageLoading = false;
  }

  onNavigateToProductsPage(categoryId: number) {
    this.router
      .navigate(['products'], {
        queryParams: { id: categoryId },
      })
      .then();
  }
}
