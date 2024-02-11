import {Injectable} from "@angular/core";
import {AppHttpClient} from "../../../shared/http/app-http-client";
import {Observable} from "rxjs";
import {configurationEndpoints} from "./configuration-endpoints";
import {CashFlowConfig} from "../types/cash-flow-config";

@Injectable()
export class ConfigurationService {
  constructor(private httpClient: AppHttpClient) {
  }

  public getCashFlowConfig(): Observable<CashFlowConfig> {
    const url = configurationEndpoints.getCashFlowConfig;
    return this.httpClient.get<CashFlowConfig>(url);
  }

  public updateCashFlowConfig(config: CashFlowConfig): Observable<CashFlowConfig> {
    const url = configurationEndpoints.updateCashFlowConfig;
    return this.httpClient.put<CashFlowConfig>(url, config);
  }
}
