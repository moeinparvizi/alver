import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatButton } from '@angular/material/button';
import { RouteUtil } from '../../util/route.util';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [MatButton, SpinnerComponent, NgClass],
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
          this.showSnackBar('محصولی وجود ندارد');
          this.basket = undefined;
          this.noProducts = true;
        }
        if (err.erorr == 'unauthenticated') {
          this.showSnackBar('لطفا قبل از دیدن این صفحه لاگین کنید');
          setInterval(() => this.onNavigationToLogIn(), 3000);
        }
      },
    });
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
          this.showSnackBar('خطا در سیستم لطفا دوباره تلاش کنید');
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
          this.showSnackBar('خطا در سیستم لطفا دوباره تلاش کنید');
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
          this.showSnackBar('خطا در سیستم لطفا دوباره تلاش کنید');
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
        this.showSnackBar('خطا در سیستم لطفا دوباره تلاش کنید');
      },
    });
  }
}
