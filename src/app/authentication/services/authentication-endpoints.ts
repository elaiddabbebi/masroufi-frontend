import {environment} from "../../../Environments/app.environment";

const baseUrl = environment.apiBaseUrl;

export const authenticationEndpoints = {
  login: baseUrl + '/login'
}
