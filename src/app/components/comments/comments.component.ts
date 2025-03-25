import {
  Component,
  Injector,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { GenerateArrayPipe } from '../../util/pipes/generateArray.pipe';
import { Config } from '../../common/config';
import { RouteUtil } from '../../util/route.util';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    MatButtonModule,
    GenerateArrayPipe,
    CommonModule,
    FormsModule,
    SpinnerComponent,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent
  extends BaseComponent
  implements OnInit, OnChanges
{
  @Input() productsId?: any;

  comments?: any;
  isLoading = false;

  title?: string;
  text?: string;
  selectedRating?: number;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.loadOnline();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check if productsId has changed
    if (changes['productsId'] && !changes['productsId'].isFirstChange()) {
      this.loadOnline();
    }
  }

  override loadOnline(): void {
    super.loadOnline();

    this.isLoading = true;
    this.serviceApi
      .getComments({
        product_id: this.productsId,
      })
      .subscribe({
        next: (data: any) => {
          this.isLoading = false;
          this.GlobalsService.isLoggedIn = true;
          this.comments = data;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  onRatingChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedRating = Number(inputElement.value);
  }

  onSendData() {
    if (this.GlobalsService.getUserToken()) {
      this.serviceApi
        .addComment({
          product_id: this.productsId,
          title: this.title,
          text: this.text,
          rate: this.selectedRating,
        })
        .subscribe({
          next: (data: any) => {
            this.loadOnline();
          },
          error: () => {
            this.isLoading = false;
          },
        });
    } else {
      this.onNavigationToLogIn();
    }
  }

  onNavigationToLogIn() {
    this.router.navigate([RouteUtil.REGISTER]).then();
  }
}
