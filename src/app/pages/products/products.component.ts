import { Component, Injector, OnInit } from '@angular/core';
import { GetProductsService } from '../../services/getProducts/get-products.service';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { CardComponent } from '../../components/card/card.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { BaseComponent } from '../../base.component';
import { CategoryResponse } from '../../models/data.response';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    SpinnerComponent,
    CardComponent,
    MatRadioModule,
    FormsModule,
    CarouselModule,
    MatButton,
    NgIf,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent extends BaseComponent implements OnInit {
  isLoading = false;
  products: any;
  categories?: any = [];
  companies?: any = [];

  productName?: any;
  orderBy?: string = '';
  max?: number;
  min?: number;
  private _selectedCategories: any[] = [];

  get selectedCategories(): any[] {
    return this._selectedCategories;
  }

  set selectedCategories(value: any[]) {
    this._selectedCategories = value;
    this.onServiceCalled();
  }


  constructor(
    injector: Injector,
    private getProductsService: GetProductsService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override loadOnline() {
    super.loadOnline();

    this.serviceApi.getCategories().subscribe({
      next: (res: CategoryResponse) => {
        this.categories = res.categories;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snakeBar.show(err, 'بستن', 3000, 'custom-snackbar');
      },
    });

    // this.serviceApi.getCompanies().subscribe({
    //   next: (res: any) => {
    //     this.companies = res.companies;
    //     this.isLoading = false;
    //   },
    //   error: (err: any) => {
    //     this.isLoading = false;
    //     this.snakeBar.show(err, 'بستن', 3000, 'custom-snackbar');
    //   },
    // });

    this.getParam();
  }

  getParam() {
    this.ActiveRoute.queryParams.subscribe((params: any) => {
      if (params['id']) {
        this.selectedCategories = [];
        this.selectedCategories.push(+params['id']);
        this.onServiceCalled();
      }
    });
    console.log(this.selectedCategories);
  }

  onCategoryChange(categoryId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter((id: any) => id !== categoryId);
    }
    this.onServiceCalled();
  }

  onSelectAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedCategories = this.categories.map((category: any) => category.id);
    } else {
      this.selectedCategories = [];
    }

    this.onServiceCalled();
  }

  areAllSelected(): boolean {
    return this.categories.length > 0 && this.selectedCategories.length === this.categories.length;
  }

  onSearchClicked() {
    this.onServiceCalled();
  }

  onServiceCalled() {
    this.isLoading = true;
    this.getProductsService
      .getProductsByFilters({
        product_name: this.productName,
        company_ids: [1, 2, 3],
        max_price: this.max,
        min_price: this.min,
        category_ids: this.selectedCategories,
        order_by: this.orderBy,
      })
      .subscribe({
        next: ({ products, isLoading }) => {
          this.products = products;
          this.isLoading = isLoading;
        },
        error: err => {
          console.error('Error fetching products:', err);
          this.isLoading = false;
        },
      });
  }
}
