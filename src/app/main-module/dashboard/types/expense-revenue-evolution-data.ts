import {Month} from "../../../shared/enums/month";
import {MonthAmount} from "./month-amount";

export interface ExpenseRevenueEvolutionData {
  months: Month[];
  revenueEvolution: MonthAmount[];
  expenseEvolution: MonthAmount[];
}
