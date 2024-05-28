import {Injectable} from "@angular/core";
import {AppHttpClient} from "../../../shared/http/app-http-client";
import {StatisticsSearchCriteria} from "../types/statistics-search-criteria";
import {Observable} from "rxjs";
import {StatisticsResult} from "../types/statistics-result";
import {statisticsEndpoints} from "./statistics-endpoints";
import {buildHttpParamsFrom} from "../../../shared/utils/utils-functions";
import {CashFlowType} from "../../cash-flow-registry/types/cash-flow-type";
import {HttpParams} from "@angular/common/http";
import {GenericObject} from "../../../shared/types/generic-object";

@Injectable()
export class StatisticsService {
  constructor(private httpClient: AppHttpClient) {}

  search(statisticsSearchCriteria: StatisticsSearchCriteria): Observable<StatisticsResult> {
    const url: string = statisticsEndpoints.search;
    const options = {
      params: buildHttpParamsFrom(statisticsSearchCriteria)
    };
    return this.httpClient.get<StatisticsResult>(url, options);
  }

  getCustomerCashFlowCategories(cashFlowType: CashFlowType): Observable<GenericObject[]> {
    const url: string = statisticsEndpoints.getCustomerCategories;
    const options = {
      params: new HttpParams().append('cashFlowType', cashFlowType)
    };
    return this.httpClient.get<GenericObject[]>(url, options);
  }

  getCustomerYearsList(): Observable<number[]> {
    const url: string = statisticsEndpoints.getYearsList;
    const options = {};
    return this.httpClient.get<number[]>(url, options);
  }
}
