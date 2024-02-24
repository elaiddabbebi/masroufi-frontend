import {ConsumptionMonthData} from "./consumption-month-data";

export interface ConsumptionEvolutionData {
  labels: string[];
  currentMonthData: ConsumptionMonthData;
  lastMonthData: ConsumptionMonthData;
}
