import {CashFlowCategory} from "../../cash-flow-list/components/cash-flow-category/types/cash-flow-category";
import {CashFlowType} from "./cash-flow-type";

export interface CashFlowRegistry {
  uuid?: string;
  name?: string;
  category?: string;
  date?: Date;
  type?: CashFlowType;
  amount?: number;
}
