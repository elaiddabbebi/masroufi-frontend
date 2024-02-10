import {environment} from "../../../environments/app.environment";

const baseUrl = environment.apiBaseUrl;

export const authenticationEndpoints = {
  login: baseUrl + '/login'
}
