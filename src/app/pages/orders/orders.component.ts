import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatButton } from '@angular/material/button';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MatButton, MatTabGroup, MatTab],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent extends BaseComponent implements OnInit {
  selectedIndex?: number = 0;
  isLoading = false;

  pendingOrders: any[] = [];
  deliveredOrders: any[] = [];
  canceledOrders: any[] = [];

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.loadOnline();
  }

  override loadOnline() {
    super.loadOnline();
    this.onCalledService();
  }

  onCalledService() {
    this.isLoading = true;
    this.serviceApi.cardHistory().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.processOrders(res.orders || []);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snakeBar.show(err, 'بستن', 3000, 'custom-snackbar');
      },
    });
  }

  processOrders(orders: any[]) {
    this.pendingOrders = orders.filter(order => !order.pay_date);
    this.deliveredOrders = orders.filter(order => order.pay_date);
    this.canceledOrders = [];
  }

  setActiveTab(tab: string) {
    switch (tab) {
      case 'pending':
        this.selectedIndex = 0;
        break;
      case 'delivered':
        this.selectedIndex = 1;
        break;
      case 'canceled':
        this.selectedIndex = 2;
        break;
      default:
        this.selectedIndex = 0;
    }
  }
}
