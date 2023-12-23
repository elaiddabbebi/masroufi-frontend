import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, map, Observable, throwError, timeout} from "rxjs";
import {TIMEOUT} from "./http-constants";

@Injectable()
export class AppHttpClient {

  constructor(private http: HttpClient) {}

  public get<T>(url: string, options: any = {}): Observable<T> {
    const token = this.getToken();
    let httpHeaders: HttpHeaders;
    if (token) {
      httpHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
    } else {
      httpHeaders = new HttpHeaders({});
    }
    return this.http.get<T>(url, {  ...options, headers: httpHeaders, observe: 'response' }).pipe(
      timeout(TIMEOUT),
      map((response: any) => {
        return response.body;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  public delete<T>(url: string, options: any = {}): Observable<T> {
    const token = this.getToken();
    let httpHeaders: HttpHeaders;
    if (token) {
      httpHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
    } else {
      httpHeaders = new HttpHeaders({});
    }
    return this.http.delete<T>(url, { ...options, headers: httpHeaders, observe: 'response' }).pipe(
      timeout(TIMEOUT),
      map((response: any) => {
        return response.body;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  public post<T>(url: string, body: any, options: any = {}): Observable<T> {
    const token = this.getToken();
    let httpHeaders: HttpHeaders;
    if (token) {
      httpHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
    } else {
      httpHeaders = new HttpHeaders({});
    }
    return this.http.post<T>(url, body, { ...options, headers: httpHeaders, observe: 'response' }).pipe(
      timeout(TIMEOUT),
      map((response: any) => {
        return response.body;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  public put<T>(url: string, body: any, options: any = {}): Observable<T> {
    const token = this.getToken();
    let httpHeaders: HttpHeaders;
    if (token) {
      httpHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
    } else {
      httpHeaders = new HttpHeaders({});
    }
    return this.http.put<T>(url, body, { ...options, headers: httpHeaders, observe: 'response' }).pipe(
      timeout(TIMEOUT),
      map((response: any) => {
        return response.body;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  public patch<T>(url: string, body: any, options: any = {}): Observable<T> {
    const token = this.getToken();
    let httpHeaders: HttpHeaders;
    if (token) {
      httpHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
    } else {
      httpHeaders = new HttpHeaders({});
    }
    return this.http.patch<T>(url, body, { ...options, headers: httpHeaders, observe: 'response' }).pipe(
      timeout(TIMEOUT),
      map((response: any) => {
        return response.body;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  private getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
