import {environment} from "../../../environments/environment";

const baseUrl = environment.apiBaseUrl;

export const authEndpoints = {
  login: baseUrl + '/login'
}
