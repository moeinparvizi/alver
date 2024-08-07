import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onHandleNvigateToProducts(): void {
    this.router.navigate(['products']);
  }
  onHandleNvigateToProduct(): void {
    this.router.navigate(['product', 1, 'test'], {
      queryParams: { id: 1, name: 'test' },
    });
  }
}
