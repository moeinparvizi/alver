import { GetProductsService } from './../../services/getProducts/get-products.service';
import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ProductResponse } from '../../models/data.response';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageFullscreenComponent } from '../../components/image-fullscreen/image-fullscreen.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [MatButtonModule, CommonModule, FormsModule, MatDialogModule, ImageFullscreenComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailComponent extends BaseComponent implements OnInit {
  product?: ProductResponse;
  isLoading = true;
  selectedLiter = 1;
  count = 1;

  mainImage?: string;

  showFullScreen = false;

  constructor(
    injector: Injector,
    private getProductsService: GetProductsService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.loadOnline();
  }

  override loadOnline(): void {
    super.loadOnline();

    const productId = this.ActiveRoute.snapshot.paramMap.get('id');
    const id = Number(productId);

    this.getProductsService.getProduct(id).subscribe({
      next: ({ product, isLoading }) => {
        this.product = product;
        this.isLoading = isLoading;
      },
      error: err => {
        console.error('Error fetching products:', err);
        this.isLoading = false;
      },
    });

    console.log(this.product);
  }

  changeMainImage(event: Event) {
    const clickedImageSrc = (event.target as HTMLImageElement).src;
    this.mainImage = clickedImageSrc;
  }

  openImageDialog(): void {
    console.log(this.mainImage);
    this.dialog.open(ImageFullscreenComponent, {
      data: { imageUrl: this.mainImage },
    });
  }
}
