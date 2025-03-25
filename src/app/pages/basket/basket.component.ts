import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatButton } from '@angular/material/button';
import { RouteUtil } from '../../util/route.util';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { Config } from '../../common/config';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [MatButton, SpinnerComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent extends BaseComponent implements OnInit {
  basket?: any;
  isLoading: any;
  noProducts?: boolean;
  sumPrice?: string;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override loadOnline() {
    super.loadOnline();
    this.onServiceCalled();
  }

  onServiceCalled() {
    this.isLoading = true;
    this.noProducts = false;

    this.serviceApi.getCard().subscribe({
      next: (res: any) => {
        this.basket = res.product;
        this.sumPrice = res.sum_prices;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        if (err.error == 'No product') {
          this.snakeBar.show(
            'محصولی وجود ندارد',
            'بستن',
            3000,
            'custom-snackbar'
          );
          this.basket = undefined;
          this.noProducts = true;
        }
        if (err.erorr == 'unauthenticated') {
          this.snakeBar.show(
            'لطفا قبل از دیدن این صفحه لاگین کنید',
            'بستن',
            2000,
            'custom-snackbar'
          );
          setInterval(() => this.onNavigationToLogIn(), 3000);
        }
      },
    });
  }

  onNavigationToLogIn() {
    this.router.navigate([RouteUtil.REGISTER]).then();
  }

  positiveClicked(id: any) {
    this.serviceApi
      .addCard({
        id: id,
      })
      .subscribe({
        next: (data: any) => {
          if (data.success) {
            this.onServiceCalled();
          }
        },
        error: () => {
          this.snakeBar.show('خطا در سیستم', 'بستن', 3000, 'custom-snackbar');
        },
      });
  }

  negativeClicked(id: any) {
    this.serviceApi
      .removeACard({
        id: id,
      })
      .subscribe({
        next: (data: any) => {
          if (data == 'product Remove') {
            this.onServiceCalled();
          }
        },
        error: () => {
          this.snakeBar.show('خطا در سیستم', 'بستن', 3000, 'custom-snackbar');
        },
      });
  }

  removeProductClicked(id: any) {
    this.serviceApi
      .removeCard({
        id: id,
      })
      .subscribe({
        next: (data: any) => {
          if (data == 'product Delete') {
            this.onServiceCalled();
          }
        },
        error: (err: any) => {
          this.snakeBar.show('خطا در سیستم', 'بستن', 3000, 'custom-snackbar');
        },
      });
  }

  onNavigateToProductDetail(id: any, name: string) {
    this.router.navigate([RouteUtil.PRODUCT_DETAIL, id, name]).then();
  }

  onConfirmCard() {
    this.serviceApi.cardConfirm().subscribe({
      next: (res: any) => {
        if (res == 'Order Confirmed') {
          this.router.navigate([RouteUtil.ORDERS]).then();
        }
      },
      error: () => {
        this.snakeBar.show('خطا در سیستم', 'بستن', 3000, 'custom-snackbar');
      }
    })
  }
}
