import {Injectable} from "@angular/core";
import {AppHttpClient} from "../../../../../shared/http/app-http-client";
import {Observable} from "rxjs";
import {ValidityModel} from "../../../../../shared/types/validity-model";
import {CashFlow} from "../types/cash-flow";
import {cashFlowEndpoints} from "./cash-flow-endpoints";

@Injectable()
export class CashFlowService {
  constructor(private httpClient: AppHttpClient) {}

  public getCashFlowDetails(uuid: string): Observable<CashFlow>{
    const url = cashFlowEndpoints.getDetails(uuid);
    return this.httpClient.get<CashFlow>(url);
  }

  public searchCashFlow(): Observable<CashFlow[]>{
    const url = cashFlowEndpoints.search;
    return this.httpClient.get<CashFlow[]>(url);
  }

  public createCashFlow(categoryDetails: CashFlow): Observable<CashFlow>{
    const url = cashFlowEndpoints.createCashFlow;
    return this.httpClient.post<CashFlow>(url, categoryDetails);
  }

  public deleteCashFlow(uuid: string): Observable<CashFlow>{
    const url = cashFlowEndpoints.deleteCashFlow(uuid);
    return this.httpClient.delete<CashFlow>(url);
  }

  public updateCashFlow(uuid: string, categoryDetails: CashFlow): Observable<CashFlow>{
    const url = cashFlowEndpoints.updateCashFlow(uuid);
    return this.httpClient.put<CashFlow>(url, categoryDetails);
  }

  public validateRejectCashFlow(uuid: string, valid: boolean): Observable<CashFlow>{
    const url = cashFlowEndpoints.validateRejectCashFlow(uuid);
    const validity: ValidityModel = {
      valid: valid
    }
    return this.httpClient.patch<CashFlow>(url, validity);
  }
}
