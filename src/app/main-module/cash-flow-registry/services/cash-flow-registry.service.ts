import {Injectable} from "@angular/core";
import {AppHttpClient} from "../../../shared/http/app-http-client";
import {Observable} from "rxjs";
import {cashFlowRegistryEndpoints} from "./cash-flow-registry-endpoints";
import {CashFlowRegistry} from "../types/cash-flow-registry";

@Injectable()
export class CashFlowRegistryService {
  constructor(private httpClient: AppHttpClient) {}

  public getDetails(uuid: string): Observable<CashFlowRegistry>{
    const url = cashFlowRegistryEndpoints.getDetails(uuid);
    return this.httpClient.get<CashFlowRegistry>(url);
  }

  public search(): Observable<CashFlowRegistry[]>{
    const url = cashFlowRegistryEndpoints.search;
    return this.httpClient.get<CashFlowRegistry[]>(url);
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
