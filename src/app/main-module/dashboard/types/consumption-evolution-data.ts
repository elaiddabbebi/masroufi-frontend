import {ConsumptionMonthData} from "./consumption-month-data";

export interface ConsumptionEvolutionData {
  daysOfMonth: string[];
  currentMonthData: ConsumptionMonthData;
  lastMonthData: ConsumptionMonthData;
}
