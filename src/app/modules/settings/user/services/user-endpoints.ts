import {environment} from "../../../../../Environments/app.environment";

const baseUrl = environment.apiBaseUrl;

export const userEndpoints = {
  search: baseUrl + '/user/search',
  create: baseUrl + '/user',
  getDetails: (uuid: string) => baseUrl + `/user/${uuid}`,
  updateDetails: (uuid: string) => baseUrl + `/user/details/${uuid}`,
  updatePassword: (uuid: string) => baseUrl + `/user/password/${uuid}`,
  delete: (uuid: string) => baseUrl + `/user/${uuid}`,
  activateDeactivate: (uuid: string) => baseUrl + `/user/activate-deactivate/${uuid}`
}
