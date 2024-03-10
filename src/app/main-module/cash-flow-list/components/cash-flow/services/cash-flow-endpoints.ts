import {environment} from "../../../../../../environments/environment";

const baseUrl = environment.apiBaseUrl;

export const cashFlowEndpoints = {
  getDetails: (uuid: string): string => baseUrl + `/cash-flow/${uuid}`,
  search: baseUrl + `/cash-flow`,
  deleteCashFlow: (uuid: string): string => baseUrl + `/cash-flow/${uuid}`,
  createCashFlow: baseUrl + `/cash-flow`,
  updateCashFlow: (uuid: string): string => baseUrl + `/cash-flow/${uuid}`,
  validateRejectCashFlow: (uuid: string): string => baseUrl + `/cash-flow/${uuid}`,
  getAllNameList: baseUrl + '/cash-flow/name-list',
  searchByCategory: baseUrl + '/cash-flow/search',
}
