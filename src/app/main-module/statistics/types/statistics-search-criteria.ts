import {CashFlowType} from "../../cash-flow-registry/types/cash-flow-type";
import {StatisticsSearchType} from "./statistics-search-type";

export interface StatisticsSearchCriteria {
  cashFlowType: CashFlowType;
  searchType: StatisticsSearchType;
  categoryUuid?: string;
  year?: number;
  startDate?: Date;
  endDate?: Date;
}
