import {MonthConsumptionData} from "./month-consumption-data";

export interface ConsumptionEvolutionData {
  daysOfMonth: string[];
  currentMonthData: MonthConsumptionData;
  lastMonthData: MonthConsumptionData;
}
