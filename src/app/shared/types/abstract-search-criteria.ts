import {SortOrder} from "./sort-order";

export abstract class AbstractSearchCriteria {
  page: number = 1;
  size: number = 10;
  primarySortField?: string;
  primarySortOrder?: SortOrder;
  secondarySortField?: string;
  secondarySortOrder?: SortOrder;
}
