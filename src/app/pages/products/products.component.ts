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
import { CommonModule, NgIf } from '@angular/common';

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
    CommonModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent extends BaseComponent implements OnInit {
  isLoading = false;
  products: any;
  categories?: any = [];
  companies?: any = [];
  isExpanded1?: boolean = false;
  isExpanded2?: boolean = false;

  productName?: any;
  orderBy?: string = '';
  max?: number;
  min?: number;
  private _selectedCategories: any[] = [];
  private _selectedCompanies: any[] = [];

  get selectedCompanies(): any[] {
    return this._selectedCompanies;
  }

  set selectedCompanies(value: any[]) {
    this._selectedCompanies = value;
  }

  get selectedCategories(): any[] {
    return this._selectedCategories;
  }

  set selectedCategories(value: any[]) {
    this._selectedCategories = value;
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
        this.categories = res.categories || [];
        this.isLoading = false;
      },
      error: (err: any) => {
        this.categories = [];
        this.isLoading = false;
        this.snakeBar.show(err, 'بستن', 3000, 'custom-snackbar');
      },
    });

    this.serviceApi.getCompanies().subscribe({
      next: (res: any) => {
        this.companies = res.categories || [];
        this.isLoading = false;
      },
      error: (err: any) => {
        this.companies = [];
        this.isLoading = false;
        this.snakeBar.show(err, 'بستن', 3000, 'custom-snackbar');
      },
    });

    this.getParam();
  }

  getParam() {
    this.ActiveRoute.queryParams.subscribe((params: any) => {
      if (params['id']) {
        this.selectedCategories = [];
        this.selectedCategories.push(+params['id']);
      }
      this.onServiceCalled();
    });
  }

  onCategoryChange(itemId: number, list: number[], event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this._selectedCategories = isChecked
      ? [...list, itemId]
      : list.filter(id => id !== itemId);
    this.onServiceCalled();
  }

  onCompanyChange(itemId: number, list: number[], event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this._selectedCompanies = isChecked
      ? [...list, itemId]
      : list.filter(id => id !== itemId);
    this.onServiceCalled();
  }

  onSelectAllCategories(items: any[], event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectedCategories = isChecked ? items.map(item => item.id) : [];
    this.onServiceCalled();
  }

  onSelectAllCompanies(items: any[], event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectedCompanies = isChecked ? items.map(item => item.id) : [];
    this.onServiceCalled();
  }

  areAllCategoriesSelected(items: any[], list: number[]): boolean {
    return items.length > 0 && list.length === items.length;
  }

  areAllCompaniesSelected(items: any[], list: number[]): boolean {
    return items.length > 0 && list.length === items.length;
  }

  onSearchClicked() {
    this.onServiceCalled();
  }

  onServiceCalled() {
    this.isLoading = true;
    this.getProductsService
      .getProductsByFilters({
        product_name: this.productName,
        company_ids: this.selectedCompanies,
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

  toggleExpand(section: string): void {
    if (section === 'categories') {
      this.isExpanded1 = !this.isExpanded1;
    } else if (section === 'brands') {
      this.isExpanded2 = !this.isExpanded2;
    }
  }
}
