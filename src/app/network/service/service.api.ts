import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicePath } from './service.path';
import { Constant } from '../../common/constant';
import { CheckTokenBody, GetProducts, LoginBody } from '../../models/service.model';
import { Observable } from 'rxjs';
import { Config } from '../../common/config';

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

  public getProducts(): Observable<GetProducts> {
    return this.http.get<GetProducts>(Constant.getApp() + ServicePath.GET_PRODUCTS);
  }

  public getComments(body: any): Observable<any> {
    return this.http.post(Constant.getApp() + ServicePath.GET_COMMNETS, body);
  }

  public addComment(body: any): Observable<any> {
    return this.http.post(Constant.getApp() + ServicePath.ADD_COMMNETS, body, {
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
