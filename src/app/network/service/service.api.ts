import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse, Query } from '../../models/service.model';
import { ServicePath } from './service.path';

@Injectable({
  providedIn: 'root',
})
export class serviceApi {
  // constructor(private http: HttpClient) {}

  // reformatQuery(queries: Query[], useAndMark = false): string {
  //   const filledValues = queries.filter((query: Query) => {
  //     return query.value !== undefined && query.value !== null;
  //   });

  //   const concatQueries = filledValues.map((query: Query) => {
  //     return `${query.key}=${query.value}`;
  //   });

  //   if (concatQueries.length > 0) {
  //     return (useAndMark ? '&' : '?') + concatQueries.join('&');
  //   }

  //   return '';
  // }

  // sample api

  // public login(number: string, password: string, captcha: string): Observable<LoginResponse> {
  //   return this.http.post<LoginResponse>(ServicePath.LOGIN + this.reformatQuery([{
  //     key: 'number',
  //     value: number
  //   }, {
  //     key: 'password',
  //     value: password
  //   }, {
  //     key: 'captcha',
  //     value: captcha
  //   }]), {});
  // }

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
