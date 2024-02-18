import {environment} from "../../../../environments/environment";

const baseUrl = environment.apiBaseUrl;

export const dashboardEndpoints = {
  getCurrentCashAmount: baseUrl + '/dashboard/current-cash-amount',
}
