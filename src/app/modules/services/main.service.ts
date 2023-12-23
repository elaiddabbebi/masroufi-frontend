import {Injectable} from "@angular/core";
import {AppHttpClient} from "../../shared/http/app-http-client";

@Injectable()
export class MainService {
  constructor(private httpClient: AppHttpClient) {}
}
