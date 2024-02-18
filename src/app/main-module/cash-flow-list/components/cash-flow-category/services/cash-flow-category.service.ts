import {Injectable} from "@angular/core";
import {AppHttpClient} from "../../../../../shared/http/app-http-client";
import {cashFlowCategoryEndpoints} from "./cash-flow-category-endpoints";
import {CashFlowCategory} from "../types/cash-flow-category";
import {Observable} from "rxjs";
import {ValidityModel} from "../../../../../shared/types/validity-model";
import {HttpParams} from "@angular/common/http";

@Injectable()
export class CashFlowCategoryService {
  constructor(private httpClient: AppHttpClient) {}

  public getCategoryDetails(uuid: string): Observable<CashFlowCategory>{
    const url = cashFlowCategoryEndpoints.getDetails(uuid);
    return this.httpClient.get<CashFlowCategory>(url);
  }

  public searchCategories(): Observable<CashFlowCategory[]>{
    const url = cashFlowCategoryEndpoints.search;
    return this.httpClient.get<CashFlowCategory[]>(url);
  }

  public findTop10CategoriesByName(name: string): Observable<CashFlowCategory[]>{
    const url = cashFlowCategoryEndpoints.top10ByName;
    const options = {
      params: new HttpParams().append('categoryName', name)
    }
    return this.httpClient.get<CashFlowCategory[]>(url, options);
  }

  public getAllNameList(): Observable<string[]>{
    const url = cashFlowCategoryEndpoints.getAllNameList;
    return this.httpClient.get<string[]>(url);
  }

  public createCategory(categoryDetails: CashFlowCategory): Observable<CashFlowCategory>{
    const url = cashFlowCategoryEndpoints.createCategory;
    return this.httpClient.post<CashFlowCategory>(url, categoryDetails);
  }

  public deleteCategory(uuid: string): Observable<CashFlowCategory>{
    const url = cashFlowCategoryEndpoints.deleteCategory(uuid);
    return this.httpClient.delete<CashFlowCategory>(url);
  }

  public updateCategory(uuid: string, categoryDetails: CashFlowCategory): Observable<CashFlowCategory>{
    const url = cashFlowCategoryEndpoints.updateCategory(uuid);
    return this.httpClient.put<CashFlowCategory>(url, categoryDetails);
  }

  public validateRejectCategory(uuid: string, valid: boolean): Observable<CashFlowCategory>{
    const url = cashFlowCategoryEndpoints.validateRejectCategory(uuid);
    const validity: ValidityModel = {
      valid: valid
    }
    return this.httpClient.patch<CashFlowCategory>(url, validity);
  }

  public checkIfCategoryExist(categoryName: string): Observable<boolean>{
    const url = cashFlowCategoryEndpoints.checkIfCategoryExist;
    const options = {
      params: new HttpParams().append('categoryName', categoryName)
    };
    return this.httpClient.get<boolean>(url, options);
  }
}
