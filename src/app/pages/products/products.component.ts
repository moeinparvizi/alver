import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
