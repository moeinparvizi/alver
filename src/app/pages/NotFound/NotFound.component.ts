import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  template: `<p>NotFount works!</p>`,
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
    this.router.navigate(['']);
  }

  override onBackPressed(): void {
    super.onBackPressed();
  }
}
