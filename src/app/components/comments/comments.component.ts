import { Component, Injector, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent extends BaseComponent implements OnInit {
  @Input() productsId?: any;

  commnets: any[] = [1, 2, 3, 4];

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();

    console.log(this.productsId);
  }

  override loadOnline(): void {
    super.loadOnline();
  }
}
