import {Injectable} from "@angular/core";
import {AppHttpClient} from "../../../shared/http/app-http-client";
import {Observable} from "rxjs";
import {dashboardEndpoints} from "./dashboard-endpoints";

@Injectable()
export class DashboardService {
  constructor(private httpClient: AppHttpClient) {
  }

  public getCurrentCashAmount(): Observable<number> {
    const url = dashboardEndpoints.getCurrentCashAmount;
    return this.httpClient.get<number>(url);
  }
}
