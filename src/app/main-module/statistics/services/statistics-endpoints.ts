import {environment} from "../../../../environments/environment";

const apiBaseUrl: string = environment.apiBaseUrl;
export const statisticsEndpoints = {
  search: apiBaseUrl + '/statistics/search',
  getYearsList: apiBaseUrl + '/statistics/years-list',
  getCustomerCategories: apiBaseUrl + '/statistics/cash-flow-categories'
};
