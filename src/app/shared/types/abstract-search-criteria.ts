import {Sort} from "./sort";

export interface AbstractSearchCriteria {
  page: number;
  size: number;
  orderBy: Sort[];
}
