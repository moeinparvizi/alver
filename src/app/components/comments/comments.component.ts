import { Component, Injector, OnInit } from '@angular/core';
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

  commnets: any[] = [1,2,3,4];

constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override loadOnline(): void {
    super.loadOnline();
  }
}
