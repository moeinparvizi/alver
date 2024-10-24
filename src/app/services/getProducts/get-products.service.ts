import { GetProducts } from './../../models/service.model';
import { Injectable, Injector } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProductsResponse } from '../../models/data.response';

@Injectable({
  providedIn: 'root',
})
export class GetProductsService extends BaseComponent {
  products: any[] = [];
  isLoading = false;

  amazingProducts: any[] = [];

  constructor(injector: Injector) {
    super(injector);
  }

  // Return an observable that fetches products asynchronously
  getProducts(): Observable<any> {
    if (this.products.length > 0) {
      // If products are already cached, return them
      return of({ products: this.products, isLoading: false });
    }

    this.isLoading = true;

    return new Observable(observer => {
      this.serviceApi.getProducts().subscribe({
        next: (res: ProductsResponse) => {
          this.products = res.products;
          this.isLoading = false;
          observer.next({ products: this.products, isLoading: this.isLoading });
          observer.complete();
        },
        error: (err: any) => {
          this.isLoading = false;
          this.snakeBar.show(err, 'بستن', 3000, 'custom-snackbar');
          observer.error(err);
        },
      });
    });
  }

  getProduct(id: number): Observable<any> {
    if (this.products.length > 0) {
      // If products are already fetched, find the product from the cached array
      const product = this.products.find(p => p?.id === id);
      return of({ product, isLoading: false });
    }

    // Otherwise, fetch the products and then find the specific product
    this.isLoading = true;
    return this.getProducts().pipe(
      map(({ products }) => {
        const product = products.find((p: any) => p?.id === id);
        this.isLoading = false;
        return { product, isLoading: this.isLoading };
      }),
      catchError(err => {
        this.isLoading = false;
        this.snakeBar.show(err, 'بستن', 3000, 'custom-snackbar');
        return of(null); // Return null in case of an error
      })
    );
  }

  getAmazingProducts(): Observable<any> {
    this.isLoading = true;
    return new Observable(observer => {
      this.serviceApi.getAmazingProduct().subscribe({
        next: (res: ProductsResponse) => {
          this.amazingProducts = res.products;
          this.isLoading = false;
          observer.next({ amazingProducts: this.amazingProducts, isLoading: this.isLoading });
          observer.complete();
        },
        error: (err: any) => {
          this.isLoading = false;
          this.snakeBar.show(err, 'بستن', 3000, 'custom-snackbar');
          observer.error(err);
        },
      });
    });
  }
}
