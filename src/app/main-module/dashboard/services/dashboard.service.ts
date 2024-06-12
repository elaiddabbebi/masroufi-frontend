import {Injectable} from "@angular/core";
import {AppHttpClient} from "../../../shared/http/app-http-client";
import {Observable} from "rxjs";
import {dashboardEndpoints} from "./dashboard-endpoints";
import {ConsumptionEvolutionData} from "../types/consumption-evolution-data";
import {MonthAmount} from "../types/month-amount";
import {ExpenseRevenueEvolutionData} from "../types/expense-revenue-evolution-data";

@Injectable()
export class DashboardService {
  constructor(private httpClient: AppHttpClient) {}

  public getCurrentCashAmount(): Observable<number> {
    const url: string = dashboardEndpoints.getCurrentCashAmount;
    return this.httpClient.get<number>(url);
  }

  public getCurrentWeekConsumption(): Observable<number> {
    const url: string = dashboardEndpoints.getCurrentWeekConsumption;
    return this.httpClient.get<number>(url);
  }

  public getLastWeekConsumption(): Observable<number> {
    const url: string = dashboardEndpoints.getLastWeekConsumption;
    return this.httpClient.get<number>(url);
  }

  public getCurrentWeekBalance(): Observable<number> {
    const url: string = dashboardEndpoints.getCurrentWeekBalance;
    return this.httpClient.get<number>(url);
  }

  public getLastWeekBalance(): Observable<number> {
    const url: string = dashboardEndpoints.getLastWeekBalance;
    return this.httpClient.get<number>(url);
  }

  public getCurrentMonthConsumption(): Observable<number> {
    const url: string = dashboardEndpoints.getCurrentMonthConsumption;
    return this.httpClient.get<number>(url);
  }

  public getLastMonthConsumption(): Observable<number> {
    const url: string = dashboardEndpoints.getLastMonthConsumption;
    return this.httpClient.get<number>(url);
  }

  public getCurrentMonthBalance(): Observable<number> {
    const url: string = dashboardEndpoints.getCurrentMonthBalance;
    return this.httpClient.get<number>(url);
  }

  public getLastMonthBalance(): Observable<number> {
    const url: string = dashboardEndpoints.getLastMonthBalance;
    return this.httpClient.get<number>(url);
  }

  public getCurrentYearRevenue(): Observable<number> {
    const url: string = dashboardEndpoints.getCurrentYearRevenue;
    return this.httpClient.get<number>(url);
  }

  public getCurrentYearBalance(): Observable<number> {
    const url: string = dashboardEndpoints.getCurrentYearBalance;
    return this.httpClient.get<number>(url);
  }

  public getConsumptionEvolution(): Observable<ConsumptionEvolutionData> {
    const url: string = dashboardEndpoints.getConsumptionEvolution;
    return this.httpClient.get<ConsumptionEvolutionData>(url);
  }

  public getCurrentYearRevenueEvolution(): Observable<MonthAmount[]> {
    const url: string = dashboardEndpoints.getCurrentYearRevenueEvolution;
    return this.httpClient.get<MonthAmount[]>(url);
  }

  public getCurrentYearExpenseEvolution(): Observable<MonthAmount[]> {
    const url: string = dashboardEndpoints.getCurrentYearExpenseEvolution;
    return this.httpClient.get<MonthAmount[]>(url);
  }

  public getCurrentYearExpenseRevenueEvolution(): Observable<ExpenseRevenueEvolutionData> {
    const url: string = dashboardEndpoints.getCurrentYearExpenseRevenueEvolution;
    return this.httpClient.get<ExpenseRevenueEvolutionData>(url);
  }
}
