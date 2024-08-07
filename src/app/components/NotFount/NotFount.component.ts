import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-not-fount',
  standalone: true,
  imports: [],
  template: `<p>NotFount works!</p>`,
  styleUrl: './NotFount.component.scss',
  templateUrl: './NotFount.component.html',
})
export class NotFountComponent extends BaseComponent implements OnInit {
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
