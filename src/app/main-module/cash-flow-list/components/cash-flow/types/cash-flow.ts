import {CashFlowStatus} from "./cash-flow-status";
import {CashFlowCategory} from "../../cash-flow-category/types/cash-flow-category";

export interface CashFlow {
  uuid?: string;
  name: string;
  category?: CashFlowCategory;
  gain: boolean;
  expense: boolean;
  published?: boolean;
  status?: CashFlowStatus;
  createdBy?: string;
}
