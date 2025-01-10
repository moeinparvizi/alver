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

  //   public getMyLoginInfo(): Observable<any> {
  //   return this.http.post(ServicePath.GET_LOGIN_INFO, {});
  // }
  //   public getTermLessonSessions(offset?: number, limit?: number, extra?: string, requestType?: string, Filter?: any): Observable<any> {
  //   return this.http.post(Constant.getHttpsSamaEducation() + ServicePath.GET_TERM_LESSON_SESSIONS + this.reformatQuery([{
  //     key: 'offset',
  //     value: offset
  //   }, {
  //     key: 'limit',
  //     value: limit
  //   }, {
  //     key: 'extra',
  //     value: extra
  //   }, {
  //     key: 'RequestType',
  //     value: requestType
  //   }]), Filter);
  // }
  //   public deleteStudentEnrollments(StudentEnrollmentsId: any): Observable<any> {
  //   return this.http.delete(Constant.getHttpsSamaEducation() + ServicePath.DELETE_STUDENT_ENROLLMENTS + '/' + StudentEnrollmentsId);
  // }
  //   public createAddOrUpdateStudentTermSchedule(StudentTermSchedules: any): Observable<any> {
  //   return this.http.post(Constant.getHttpsSamaEducation() + ServicePath.ADD_OR_UPDATE_STUDENT_TERM_SCHEDULE, StudentTermSchedules);
  // }
  // public updateStudentTermSchedules(StudentTermSchedulesId: any, StudentTermSchedules: any): Observable<any> {
  //   return this.http.post(Constant.getHttpsSamaEducation() + ServicePath.UPDATE_STUDENT_TERM_SCHEDULE + '/' + StudentTermSchedulesId, StudentTermSchedules);
  // }
  //   public updateProfessorReferSettings(ProfessorReferSettingId: string, ProfessorReferSetting: any): Observable<any> {
  //   return this.http.put(Constant.getHttpsSamaFinancial() + ServicePath.UPDATE_PROFESSOR_REFER_SETTINGS + '/' + ProfessorReferSettingId, ProfessorReferSetting);
  // }
}
