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

  public getCurrentWeekConsumption(): Observable<number> {
    const url = dashboardEndpoints.getCurrentWeekConsumption;
    return this.httpClient.get<number>(url);
  }

  public getLastWeekConsumption(): Observable<number> {
    const url = dashboardEndpoints.getLastWeekConsumption;
    return this.httpClient.get<number>(url);
  }

  public getLastMonthBalance(): Observable<number> {
    const url = dashboardEndpoints.getLastMonthBalance;
    return this.httpClient.get<number>(url);
  }
}
