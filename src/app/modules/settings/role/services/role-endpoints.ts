import {environment} from "../../../../../Environments/app.environment";

const baseUrl = environment.apiBaseUrl;

export const roleEndpoints = {
  getAllRoles: baseUrl + '/role/get-all',
  getAllPermissions: baseUrl + '/role/get-all-permissions',
  getDetails: (uuid: string) => baseUrl + `/role/${uuid}`,
  create: baseUrl + '/role',
  update: baseUrl + `/role`,
  delete: (uuid: string) => baseUrl + `/role/${uuid}`
}
