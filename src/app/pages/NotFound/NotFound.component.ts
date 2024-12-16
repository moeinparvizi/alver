import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MatButtonModule],
  styleUrl: './NotFound.component.scss',
  templateUrl: './NotFound.component.html',
})
export class NotFoundComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  redirectToHome() {
    this.router.navigate(['']).then();
  }

  override onBackPressed(): void {
    super.onBackPressed();
  }
}
