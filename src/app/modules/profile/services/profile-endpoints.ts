import {environment} from "../../../../environments/app.environment";

const baseUrl = environment.apiBaseUrl;

export const profileEndpoints = {
  getInfo: baseUrl + '/profile/details',
  updateDetails: baseUrl + '/profile/details',
  updatePassword: baseUrl + '/profile/password'
}
