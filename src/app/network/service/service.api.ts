import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicePath } from './service.path';
import { Constant } from '../../common/constant';
import { CheckTokenBody, LoginBody } from '../../models/service.model';
import { Observable } from 'rxjs';
import { CategoryResponse, ProductsResponse } from '../../models/data.response';

@Injectable({
  providedIn: 'root',
})
export class serviceApi {
  private httpHeader: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  constructor(private http: HttpClient) {}

  public registriation(body: LoginBody): Observable<any> {
    return this.http.post(Constant.getApp() + ServicePath.LOGIN, body);
  }

  public checkToken(body: CheckTokenBody): Observable<any> {
    return this.http.post(Constant.getApp() + ServicePath.CHECK_TOKEN, body);
  }

  public isLogIn(): Observable<any> {
    return this.http.get(Constant.getApp() + ServicePath.IS_LOGIN, {
      headers: this.httpHeader,
    });
  }

  public logOut(): Observable<any> {
    return this.http.get(Constant.getApp() + ServicePath.LOGOUT, {
      headers: this.httpHeader,
    });
  }

  public getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(Constant.getApp() + ServicePath.GET_PRODUCTS);
  }

  public getAmazingProduct(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(Constant.getApp() + ServicePath.GET_AMAZING_PRODUCTS)
  }

  public getComments(body: any): Observable<any> {
    return this.http.post(Constant.getApp() + ServicePath.GET_COMMENTS, body);
  }

  public addComment(body: any): Observable<any> {
    return this.http.post(Constant.getApp() + ServicePath.ADD_COMMENTS, body, {
      headers: this.httpHeader,
    });
  }

  public getCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(Constant.getApp() + ServicePath.GET_CATEGORIES)
  }

  public getCompanies(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(Constant.getApp() + ServicePath.GET_COMPANIES)
  }

  public getAboutUs(): Observable<any> {
    return this.http.get<any>(Constant.getApp() + ServicePath.GET_ABOUT_US)
  }

  public getProductsByFilters(body: any): Observable<any> {
    return this.http.post(Constant.getApp() + ServicePath.GET_PRODUCTS_BY_FILTERS, body);
  }

  public getCard(): Observable<any> {
    return this.http.get(Constant.getApp() + ServicePath.GET_CARD, {
      headers: this.httpHeader
    });
  }


  public addCard(body: any): Observable<any> {
    return this.http.post(Constant.getApp() + ServicePath.ADD_CARD, body, {
      headers: this.httpHeader,
    });
  }

  public removeACard(body: any): Observable<any> {
    return this.http.post(Constant.getApp() + ServicePath.REMOVE_A_CARD, body, {
      headers: this.httpHeader,
    });
  }

  public removeCard(body: any): Observable<any> {
    return this.http.post(Constant.getApp() + ServicePath.REMOVE_CARD, body, {
      headers: this.httpHeader,
    });
  }

  public addFavorite(body: any): Observable<any> {
    return this.http.post(Constant.getApp() + ServicePath.ADD_FAVORITE, body, {
      headers: this.httpHeader,
    });
  }

  public removeFavorite(body: any): Observable<any> {
    return this.http.post(Constant.getApp() + ServicePath.REMOVE_FAVORITE, body, {
      headers: this.httpHeader,
    });
  }

  public checkFavorite(body: any): Observable<any> {
    return this.http.post(Constant.getApp() + ServicePath.CHECK_FAVORITE, body, {
      headers: this.httpHeader,
    });
  }

  public getFavorite(): Observable<any> {
    return this.http.get(Constant.getApp() + ServicePath.GET_FAVORITE, {
      headers: this.httpHeader
    });
  }

  public cardDetailCount(body: any): Observable<any> {
    return this.http.post(Constant.getApp() + ServicePath.CARD_DETAIL_COUNT, body, {
      headers: this.httpHeader,
    });
  }

  public cardTotalItems(): Observable<any> {
    return this.http.get(Constant.getApp() + ServicePath.CARD_TOTAL_ITEM, {
      headers: this.httpHeader
    });
  }

  public cardConfirm(): Observable<any> {
    return this.http.post(Constant.getApp() + ServicePath.CARD_CONFIRM, undefined, {
      headers: this.httpHeader
    });
  }

  public cardHistory(): Observable<any> {
    return this.http.get(Constant.getApp() + ServicePath.CARD_HISTORY, {
      headers: this.httpHeader
    });
  }

  public getBanners(): Observable<any> {
    return this.http.get(Constant.getApp() + ServicePath.GET_BANNERS);
  }
}
