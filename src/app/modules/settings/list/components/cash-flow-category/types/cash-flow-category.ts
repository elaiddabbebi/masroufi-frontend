import {CashFlowCategoryStatus} from "./cash-flow-category-status";

export interface CashFlowCategory {
  uuid: string;
  name: string;
  gain: boolean;
  expense: boolean;
  systemCategory: boolean;
  status: CashFlowCategoryStatus;
}
