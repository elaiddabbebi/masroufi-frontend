import {Injectable} from "@angular/core";
import {AppHttpClient} from "../../../shared/http/app-http-client";
import {Observable} from "rxjs";
import {Role} from "../types/role";
import {roleEndpoints} from "./role-endpoints";
import {Permission} from "../types/permission";

@Injectable()
export class RoleService {
  constructor(private httpClient: AppHttpClient) {}

  public getRoleDetails(uuid: string): Observable<Role> {
    const url: string = roleEndpoints.getDetails(uuid);
    return this.httpClient.get<Role>(url);
  }

  public getAllRoles(): Observable<Role[]> {
    const url: string = roleEndpoints.getAllRoles;
    return this.httpClient.get<Role[]>(url);
  }

  public getAllPermissions(): Observable<Permission[]> {
    const url: string = roleEndpoints.getAllPermissions;
    return this.httpClient.get<Permission[]>(url);
  }

  public createRole(role: Role): Observable<Role> {
    const url: string = roleEndpoints.create;
    return this.httpClient.post<Role>(url, role);
  }

  public updateRole(role: Role): Observable<Role> {
    const url: string = roleEndpoints.update;
    return this.httpClient.put<Role>(url, role);
  }

  public deleteRole(uuid: string): Observable<Role> {
    const url: string = roleEndpoints.delete(uuid);
    return this.httpClient.delete<Role>(url);
  }
}
