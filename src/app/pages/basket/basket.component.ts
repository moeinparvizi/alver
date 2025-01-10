import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [MatButton],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override loadOnline() {
    super.loadOnline();
  }
}
