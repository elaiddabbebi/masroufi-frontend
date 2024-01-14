import {environment} from "../../../../../../../Environments/app.environment";

const baseUrl = environment.apiBaseUrl;

export const cashFlowCategoryEndpoints = {
  getDetails: (uuid: string): string => baseUrl + `/cash-flow-category/${uuid}`,
  search: baseUrl + `/cash-flow-category`,
  deleteCategory: (uuid: string): string => baseUrl + `/cash-flow-category/${uuid}`,
  createCategory: baseUrl + `/cash-flow-category`,
  updateCategory: (uuid: string): string => baseUrl + `/cash-flow-category/${uuid}`,
  validateRejectCategory: (uuid: string): string => baseUrl + `/cash-flow-category/${uuid}`,
}
