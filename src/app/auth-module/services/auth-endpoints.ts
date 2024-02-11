import {environment} from "../../../environments/app.environment";

const baseUrl = environment.apiBaseUrl;

export const authEndpoints = {
  login: baseUrl + '/login'
}
