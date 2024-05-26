import {Injectable} from "@angular/core";
import {AppHttpClient} from "../../../shared/http/app-http-client";

@Injectable()
export class StatisticsService {
  constructor(private httpClient: AppHttpClient) {}
}
