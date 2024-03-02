import {environment} from "../../../../environments/environment";

const baseUrl = environment.apiBaseUrl;

export const cashFlowRegistryEndpoints = {
  getDetails: (uuid: string): string => baseUrl + `/customer-cash-flow-registry/${uuid}`,
  findAll: baseUrl + '/customer-cash-flow-registry',
  search: baseUrl + '/customer-cash-flow-registry/search',
  delete: (uuid: string): string => baseUrl + `/customer-cash-flow-registry/${uuid}`,
  create: baseUrl + '/customer-cash-flow-registry',
  update: (uuid: string): string => baseUrl + `/customer-cash-flow-registry/${uuid}`,
}
