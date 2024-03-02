import {HttpParams} from "@angular/common/http";

export function buildHttpParamsFrom(object: any): HttpParams {
  let httpParams: HttpParams = new HttpParams();
  if (object) {
    Object.keys(object).forEach((key: string): void => {
      if (object[key]) {
        httpParams = httpParams.append(key, object[key].toString());
      }
    });
  }
  return httpParams;
}
