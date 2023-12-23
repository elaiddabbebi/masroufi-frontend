import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppHttpClient} from "../../../../shared/http/app-http-client";
import {AccountDetails} from "../../../types/account-details";
import {profileEndpoints} from "./profile-endpoints";
import {AccountPasswordModel} from "../types/account-password-model";

@Injectable()
export class ProfileService {
  constructor(private httpClient: AppHttpClient) {}

  public getAccountInfo(): Observable<AccountDetails> {
    const url = profileEndpoints.getInfo;
    return this.httpClient.get<AccountDetails>(url);
  }

  public updateProfileDetails(details: AccountDetails): Observable<AccountDetails> {
    const url = profileEndpoints.updateDetails;
    return this.httpClient.put<AccountDetails>(url, details);
  }

  public updatePassword(accountPassword: AccountPasswordModel): Observable<AccountDetails> {
    const url = profileEndpoints.updatePassword;
    return this.httpClient.put<AccountDetails>(url, accountPassword);
  }
}
