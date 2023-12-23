import {Injectable} from "@angular/core";
import {AppHttpClient} from "../../shared/http/app-http-client";
import {LoginRequestModel} from "../login/types/login-request-model";
import {LoginResponseModel} from "../login/types/login-response-model";
import {Observable} from "rxjs";
import {authenticationEndpoints} from "./authentication-endpoints";

@Injectable()
export class AuthenticationService {
  constructor(private httpClient: AppHttpClient) {}

  public login(loginModel: LoginRequestModel): Observable<LoginResponseModel> {
    const url = authenticationEndpoints.login;
    return this.httpClient.post<LoginResponseModel>(url, loginModel);
  }
}
