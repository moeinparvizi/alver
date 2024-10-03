import { CommonModule } from '@angular/common';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ProductResponse } from '../../models/data.response';
import { SpinnerComponent } from '../spinner/spinner.component';
import { RouteUtil } from '../../util/route.util';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent extends BaseComponent implements OnInit {
  @Input() product?: ProductResponse;
  isImageLoading = true;

  constructor(inject: Injector) {
    super(inject);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override loadOnline(): void {
    super.loadOnline();
  }

  onImageLoad(): void {
    this.isImageLoading = false;
  }

  onNavigateToProductDetail() {
    this.router.navigate([
      RouteUtil.PRODUCT_DETAIL,
      this.product?.id,
      this.product?.name,
    ]);
    setTimeout(() => {
      window.location.reload();
    })
  }
}
