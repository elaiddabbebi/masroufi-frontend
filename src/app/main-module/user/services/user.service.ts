import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppHttpClient} from "../../../shared/http/app-http-client";
import {AccountDetails} from "../../app-security/types/account-details";
import {userEndpoints} from "./user-endpoints";
import {AccountPasswordModel} from "../../app-security/types/account-password-model";

@Injectable()
export class UserService {
  constructor(private httpClient: AppHttpClient) {}

  public searchUserList(): Observable<AccountDetails[]> {
    const url: string = userEndpoints.search;
    return this.httpClient.get<AccountDetails[]>(url);
  }

  public createUser(userDetails: AccountDetails): Observable<AccountDetails> {
    const url: string = userEndpoints.create;
    return this.httpClient.post<AccountDetails>(url, userDetails);
  }

  public deleteUser(uuid: string): Observable<AccountDetails> {
    const url: string = userEndpoints.delete(uuid);
    return this.httpClient.delete<AccountDetails>(url);
  }

  public getUserDetails(uuid: string): Observable<AccountDetails> {
    const url: string = userEndpoints.getDetails(uuid);
    return this.httpClient.get<AccountDetails>(url);
  }

  public updateUserDetails(uuid: string, userDetails: AccountDetails): Observable<AccountDetails> {
    const url: string = userEndpoints.updateDetails(uuid);
    return this.httpClient.put<AccountDetails>(url, userDetails);
  }

  public updateUserPassword(uuid: string, passwordDetails: AccountPasswordModel): Observable<AccountDetails> {
    const url: string = userEndpoints.updatePassword(uuid);
    return this.httpClient.put<AccountDetails>(url, passwordDetails);
  }

  public activateDeactivateUser(uuid: string, isActivated: boolean): Observable<AccountDetails> {
    const url: string = userEndpoints.activateDeactivate(uuid);
    return this.httpClient.patch<AccountDetails>(url, {isActivated: isActivated});
  }
}
