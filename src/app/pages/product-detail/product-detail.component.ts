import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { BaseComponent } from '../../base.component';
import { ProductResponse } from '../../models/data.response';
import { GetProductsService } from '../../services/getProducts/get-products.service';
import { GenerateArrayPipe } from './../../util/pipes/generateArray.pipe';
import { CommentsComponent } from '../../components/comments/comments.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { Config } from '../../common/config';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    CommentsComponent,
    GenerateArrayPipe,
    SpinnerComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailComponent extends BaseComponent implements OnInit {
  product?: ProductResponse;
  isLoading = true;
  selectedLiter = 1;
  count = 0;
  rate?: any;
  isFavorite = false;
  id?: any;
  mainImage?: string;
  showFullScreen = false;
  addToProductButtonLoading = false;

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
    this.ActiveRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.id = Number(id);
      this.onServiceCalled();
      this.checkFavorite();
    });
  }

  onServiceCalled(): void {
    this.isLoading = true;

    this.getProductsService.getProduct(this.id).subscribe({
      next: ({ product }) => {
        this.product = product;
        this.rate = product?.rate;
        this.isLoading = false;
      },
      error: err => {
        console.error('Error fetching products:', err);
        this.isLoading = false;
      },
    });

    this.serviceApi.cardDetailCount({ id: this.id }).subscribe({
      next: (data: any) => {
        this.count = data.count;
      },
    });
  }

  changeMainImage(event: Event): void {
    this.mainImage = (event.target as HTMLImageElement).src;
  }

  onAddToCardAProductClicked(): void {
    this.addToProductButtonLoading = true;

    if (this.GlobalsService.getUserToken()) {
      this.serviceApi.addCard({ id: this.id }).subscribe({
        next: (data: any) => {
          this.addToProductButtonLoading = false;
          if (data.success) this.loadOnline();
        },
        error: (err) => {
          this.showSnackBar(err?.error?.message || 'خطای سیستم');
          this.addToProductButtonLoading = false;
        },
      });

      this.serviceApi.cardTotalItems().subscribe({
        next: (res: any) => {
          if (res.status) {
            Config.basketCount = res.total_items;
          }
        },
      });
    } else {
      this.onNavigationToLogIn();
    }
  }

  positiveClicked(): void {
    this.GlobalsService.getUserToken()
      ? this.modifyCard(true)
      : this.onNavigationToLogIn();
  }

  negativeClicked(): void {
    if (this.count === 0) return;

    this.GlobalsService.getUserToken()
      ? this.modifyCard(false)
      : this.onNavigationToLogIn();
  }

  private modifyCard(add: boolean): void {
    this.addToProductButtonLoading = true;
    const apiCall = add
      ? this.serviceApi.addCard({ id: this.id })
      : this.serviceApi.removeACard({ id: this.id });

    apiCall.subscribe({
      next: (data: any) => {
        this.addToProductButtonLoading = false;
        if (add && data.success) this.onServiceCalled();
        else if (!add && data === 'product Remove') this.onServiceCalled();
      },
      error: err => {
        this.addToProductButtonLoading = false;
        this.showSnackBar(err?.error?.message || 'خطای سیستم');
      },
    });
  }

  checkFavorite(): void {
    this.serviceApi.checkFavorite({ product_id: this.id }).subscribe({
      next: ({is_favorite }) => {
        this.isFavorite = is_favorite;
      },
      error: () => (this.isFavorite = false),
    });
  }

  toggleFavorite(): void {
    this.GlobalsService.getUserToken()
      ? this.isFavorite
        ? this.removeFavorite()
        : this.addFavorite()
      : this.onNavigationToLogIn();
  }

  addFavorite(): void {
    this.serviceApi.addFavorite({ product_id: this.id }).subscribe({
      next: ({ status }) => {
        if (status === 200) {
          this.isFavorite = true;
          this.showSnackBar('به علاقه‌مندی‌ها اضافه شد');
        }
      },
      error: () => this.showSnackBar('خطا در سیستم لطفا دوباره تلاش کنید'),
    });
  }

  removeFavorite(): void {
    this.serviceApi.removeFavorite({ product_id: this.id }).subscribe({
      next: ({ status }) => {
        if (status === 200) {
          this.isFavorite = false;
          this.showSnackBar('از علاقه‌مندی‌ها حذف شد');
        }
      },
      error: () => this.showSnackBar('خطا در سیستم لطفا دوباره تلاش کنید'),
    });
  }
}
