import {environment} from "../../../../environments/environment";

const baseUrl = environment.apiBaseUrl;

export const dashboardEndpoints = {
  getCurrentCashAmount: baseUrl + '/dashboard/current-cash-amount',
  getCurrentWeekConsumption: baseUrl + '/dashboard/current-week-consumption',
  getLastWeekConsumption: baseUrl + '/dashboard/last-week-consumption',
  getCurrentMonthBalance: baseUrl + '/dashboard/current-month-balance',
  getLastMonthBalance: baseUrl + '/dashboard/last-month-balance',
  getConsumptionEvolution: baseUrl + '/dashboard/consumption-evolution',
}
