import {environment} from "../../../../environments/environment";

const baseUrl = environment.apiBaseUrl;

export const configurationEndpoints = {
  getCashFlowConfig: baseUrl + '/account-config/cash-flow',
  updateCashFlowConfig: baseUrl + '/account-config/cash-flow',
  getSubscriptionConfig: baseUrl + '/account-config/subscription',
  getLanguageConfig: baseUrl + '/account-config/language',
  updateLanguageConfig: baseUrl + '/account-config/language',
}
