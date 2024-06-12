import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppHttpClient} from "../../../shared/http/app-http-client";
import {AccountDetails} from "../types/account-details";
import {appSecurityEndpoints} from "./app-security-endpoints";
import {AccountPasswordModel} from "../types/account-password-model";

@Injectable()
export class AppSecurityService {
  constructor(private httpClient: AppHttpClient) {}

  public getAccountInfo(): Observable<AccountDetails> {
    const url: string = appSecurityEndpoints.getInfo;
    return this.httpClient.get<AccountDetails>(url);
  }

  public updateAccountDetails(details: AccountDetails): Observable<AccountDetails> {
    const url: string = appSecurityEndpoints.updateDetails;
    return this.httpClient.put<AccountDetails>(url, details);
  }

  public updatePassword(accountPassword: AccountPasswordModel): Observable<AccountDetails> {
    const url: string = appSecurityEndpoints.updatePassword;
    return this.httpClient.put<AccountDetails>(url, accountPassword);
  }
}
