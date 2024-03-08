import {environment} from "../../../../environments/environment";

const baseUrl = environment.apiBaseUrl;

export const dashboardEndpoints = {
  getCurrentCashAmount: baseUrl + '/dashboard/current-cash-amount',

  getCurrentWeekConsumption: baseUrl + '/dashboard/current-week-consumption',
  getLastWeekConsumption: baseUrl + '/dashboard/last-week-consumption',
  getCurrentWeekBalance: baseUrl + '/dashboard/current-week-balance',
  getLastWeekBalance: baseUrl + '/dashboard/last-week-balance',

  getCurrentMonthConsumption: baseUrl + '/dashboard/current-month-consumption',
  getLastMonthConsumption: baseUrl + '/dashboard/last-month-consumption',
  getCurrentMonthBalance: baseUrl + '/dashboard/current-month-balance',
  getLastMonthBalance: baseUrl + '/dashboard/last-month-balance',

  getCurrentYearRevenue: baseUrl + '/dashboard/current-year-revenue',
  getCurrentYearBalance: baseUrl + '/dashboard/current-year-balance',

  getConsumptionEvolution: baseUrl + '/dashboard/consumption-evolution',
}
