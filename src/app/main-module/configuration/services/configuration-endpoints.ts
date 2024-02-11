import {environment} from "../../../../environments/app.environment";

const baseUrl = environment.apiBaseUrl;

export const configurationEndpoints = {
  getCashFlowConfig: baseUrl + '/account-config/cash-flow',
  updateCashFlowConfig: baseUrl + '/account-config/cash-flow',
}
