import {Injectable} from "@angular/core";
import {AppHttpClient} from "../../../shared/http/app-http-client";
import {Observable} from "rxjs";
import {cashFlowRegistryEndpoints} from "./cash-flow-registry-endpoints";
import {CashFlowRegistry} from "../types/cash-flow-registry";
import {CustomerCashFlowRegistrySearchCriteria} from "../types/customer-cash-flow-registry-search-criteria";
import {ResultSetResponse} from "../../../shared/types/result-set-response";
import {HttpParams} from "@angular/common/http";
import {buildHttpParamsFrom} from "../../../shared/utils/utils-functions";

@Injectable()
export class CashFlowRegistryService {
  constructor(private httpClient: AppHttpClient) {}

  public getDetails(uuid: string): Observable<CashFlowRegistry>{
    const url = cashFlowRegistryEndpoints.getDetails(uuid);
    return this.httpClient.get<CashFlowRegistry>(url);
  }

  public findAll(): Observable<CashFlowRegistry[]>{
    const url = cashFlowRegistryEndpoints.findAll;
    return this.httpClient.get<CashFlowRegistry[]>(url);
  }

  public search(searchCriteria: CustomerCashFlowRegistrySearchCriteria): Observable<ResultSetResponse<CashFlowRegistry>> {
    const url = cashFlowRegistryEndpoints.search;
    const options = {
      params: buildHttpParamsFrom(searchCriteria)
    };

    return this.httpClient.get<ResultSetResponse<CashFlowRegistry>>(url, options);
  }

  public create(categoryDetails: CashFlowRegistry): Observable<CashFlowRegistry>{
    const url = cashFlowRegistryEndpoints.create;
    return this.httpClient.post<CashFlowRegistry>(url, categoryDetails);
  }

  public delete(uuid: string): Observable<CashFlowRegistry>{
    const url = cashFlowRegistryEndpoints.delete(uuid);
    return this.httpClient.delete<CashFlowRegistry>(url);
  }

  public update(uuid: string, categoryDetails: CashFlowRegistry): Observable<CashFlowRegistry>{
    const url = cashFlowRegistryEndpoints.update(uuid);
    return this.httpClient.put<CashFlowRegistry>(url, categoryDetails);
  }
}
