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
  @Input() produtct?: ProductResponse;
  @Input() isLoading = true;

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
    alert(this.produtct?.id)
  }
}
