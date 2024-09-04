import { CommonModule } from '@angular/common';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ProductResponse } from '../../models/data.response';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent extends BaseComponent implements OnInit {
  @Input() product?: ProductResponse;
  @Input() isLoading?: boolean;

  constructor(inject: Injector) {
    super(inject);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override loadOnline(): void {
    super.loadOnline();
  }

  onNavigateToProductDetail() {
    if (this.product?.id) {
      this.router.navigate(['/product-detail', this.product.id]);
    } else {
      alert('Product ID not found');
    }
  }
}
