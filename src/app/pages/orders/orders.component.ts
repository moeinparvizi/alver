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

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override loadOnline() {
    super.loadOnline();
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
