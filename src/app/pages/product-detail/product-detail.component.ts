import { GenerateArrayPipe } from './../../util/pipes/generateArray.pipe';
import { GetProductsService } from './../../services/getProducts/get-products.service';
import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ProductResponse } from '../../models/data.response';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageFullscreenComponent } from '../../components/image-fullscreen/image-fullscreen.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommentsComponent } from '../../components/comments/comments.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { Config } from '../../common/config';
import { RouteUtil } from '../../util/route.util';

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
  count = 1;
  rate: any;

  isFavorite = false;

  id?: any;

  mainImage?: string;

  showFullScreen = false;

  addToProductButtonLoading?: boolean = false;

  constructor(
    injector: Injector,
    private getProductsService: GetProductsService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    // this.loadOnline();
  }

  override loadOnline(): void {
    super.loadOnline();

    this.ActiveRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.id = Number(id);
      this.onServiceCalled();
    });

    this.checkFavorite();
  }

  onServiceCalled() {
    this.isLoading = true;
    this.getProductsService.getProduct(this.id).subscribe({
      next: ({ product, isLoading }) => {
        this.product = product;
        this.isLoading = isLoading;
        this.rate = this.product?.rate;
        this.isLoading = false;
      },
      error: err => {
        console.error('Error fetching products:', err);
        this.isLoading = false;
      },
    });

    this.serviceApi
      .cardDetailCount({
        id: this.id,
      })
      .subscribe({
        next: (data: any) => {
          this.count = data.count;
        },
        error: (err: any) => {
          this.snakeBar.show('خطا در سیستم', 'بستن', 3000, 'custom-snackbar');
        },
      });
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

  onAddToCardAProductClicked() {
    this.addToProductButtonLoading = true;

    if (Config.isLoggedIn) {
      this.serviceApi
        .addCard({
          id: this.id,
        })
        .subscribe({
          next: (data: any) => {
            this.addToProductButtonLoading = false;
            if (data.success) {
              this.loadOnline();
            }
          },
          error: (err: any) => {
            this.snakeBar.show('خطا در سیستم', 'بستن', 3000, 'custom-snackbar');
            this.addToProductButtonLoading = false;
          },
        });


      this.serviceApi.getCard().subscribe({
        next: (res: any) => {
          Config.basketCount = res.product.length;
        }
      });
    } else {
      this.onNavigationToLogIn();
    }

  }

  positiveClicked() {
    this.addToProductButtonLoading = true;

    this.serviceApi
      .addCard({
        id: this.id,
      })
      .subscribe({
        next: (data: any) => {
          if (data.success) {
            this.addToProductButtonLoading = false;
            this.onServiceCalled();
          }
        },
        error: () => {
          this.addToProductButtonLoading = false;
          this.snakeBar.show('خطا در سیستم', 'بستن', 3000, 'custom-snackbar');
        },
      });
  }

  negativeClicked() {
    this.addToProductButtonLoading = true;

    this.serviceApi
      .removeACard({
        id: this.id,
      })
      .subscribe({
        next: (data: any) => {
          this.addToProductButtonLoading = false;
          if (data == 'product Remove') {
            this.onServiceCalled();
          }
        },
        error: () => {
          this.addToProductButtonLoading = false;
          this.snakeBar.show('خطا در سیستم', 'بستن', 3000, 'custom-snackbar');
        },
      });
  }

  onNavigationToLogIn() {
    this.router.navigate([RouteUtil.REGISTER]).then();
  }

  checkFavorite() {
    this.serviceApi.checkFavorite({ product_id: this.id }).subscribe({
      next: (data: any) => {
        if (data.status == 200) {
          this.isFavorite = true;
        }
      },
      error: () => {
        this.snakeBar.show('خطا در سیستم', 'بستن', 3000, 'custom-snackbar');
      },
    });
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  }

  addFavorite() {
    this.serviceApi.addFavorite({ product_id: this.id }).subscribe({
      next: (data: any) => {
        if (data.status == 200) {
          this.isFavorite = true;
          this.snakeBar.show('به علاقه‌مندی‌ها اضافه شد', 'بستن', 3000, 'custom-snackbar');
        }
      },
      error: () => {
        this.snakeBar.show('خطا در سیستم', 'بستن', 3000, 'custom-snackbar');
      },
    });
  }

  removeFavorite() {
    this.serviceApi.removeFavorite({ product_id: this.id }).subscribe({
      next: (data: any) => {
        if (data.status == 200) {
          this.isFavorite = false;
          this.snakeBar.show('از علاقه‌مندی‌ها حذف شد', 'بستن', 3000, 'custom-snackbar');
        }
      },
      error: () => {
        this.snakeBar.show('خطا در سیستم', 'بستن', 3000, 'custom-snackbar');
      },
    });
  }
}
