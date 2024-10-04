import { Component, Injector, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [MatButtonModule, CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent extends BaseComponent implements OnInit {
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
  }
}
