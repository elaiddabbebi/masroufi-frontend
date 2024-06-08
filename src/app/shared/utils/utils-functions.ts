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

export function getUTCDateFrom(date: Date): Date {
  if (date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0));
  } else {
    return new Date();
  }
}

export function getFirstDateOfYear(): Date {
  return new Date(new Date().getFullYear(), 0, 1);
}

export function getArrayFromNumber(lastItem: number): number[] {
  const returnValue: number[] = [];
  for (let i = 0; i < lastItem; i++) {
    returnValue.push(i);
  }
  return returnValue;
}

export function today(): Date {
  return new Date();
}
