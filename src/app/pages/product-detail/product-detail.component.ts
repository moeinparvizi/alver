import { GetProductsService } from './../../services/getProducts/get-products.service';
import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ProductResponse } from '../../models/data.response';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent extends BaseComponent implements OnInit {
  product?: ProductResponse;
  isLoading = true;

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
}
