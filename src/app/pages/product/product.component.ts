import { Component, inject, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent extends BaseComponent implements OnInit {
  activeRoute: ActivatedRoute = inject(ActivatedRoute)
  param: any;
  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.activeRoute.queryParams.subscribe(param => {
      console.log(param);

      this.param = param;
    });

    console.log(this.param);
  }
}
