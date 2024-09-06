import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../../util/pipes/search.pipe';
import { timer } from 'rxjs';
import { GetProducts } from '../../models/service.model';
import { CardComponent } from '../card/card.component';
import { GetProductsService } from '../../services/getProducts/get-products.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    SearchPipe,
    CardComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  static isOpenDialog = false;

  showHint = true;

  res?: any[];

  value = '';

  isLoading = false;

  constructor(
    injector: Injector,
    private matDialogRef: MatDialogRef<SearchComponent>,
    private getProductsService: GetProductsService
  ) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
    // sould be run serviced
    this.getProductsService.getProducts().subscribe({
      next: ({ products, isLoading }) => {
        this.res = products;
        this.isLoading = isLoading;
      },
      error: err => {
        console.error('Error fetching products:', err);
        this.isLoading = false;
      },
    });

    // this.snakeBar.show(
    //   'شما میتوانید عملیات جستجو را باز کنید : ctrl + k',
    //   'بستن',
    //   3000,
    //   'custom-snackbar'
    // );

    timer(4000).subscribe(() => {
      this.showHint = false;
    });
  }

  ngOnDestroy(): void {
    SearchComponent.isOpenDialog = false;
  }

  onNoClick(): void {
    if (SearchComponent.isOpenDialog) {
      this.matDialogRef.close();
    }
  }
}
