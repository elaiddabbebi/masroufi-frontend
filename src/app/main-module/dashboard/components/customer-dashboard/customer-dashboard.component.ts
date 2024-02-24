import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../services/dashboard.service";
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";
import {ConsumptionEvolutionData} from "../../types/consumption-evolution-data";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
  providers: [TranslatePipe]
})
export class CustomerDashboardComponent implements OnInit {

  currentCashAmount: number = 0;
  lastWeekConsumption: number = 0;
  lastMonthBalance: number = 0;
  currentWeekConsumption: number = 0;

  currentCashAmountIsLoading: boolean = false;
  lastWeekConsumptionIsLoading: boolean = false;
  lastMonthBalanceIsLoading: boolean = false;
  currentWeekConsumptionIsLoading: boolean = false;

  data: any;
  options: any;

  constructor(
    private dashboardService: DashboardService,
    private translatePipe: TranslatePipe,
  ) {}

  ngOnInit(): void {
    this.getCurrentCashAmount();
    this.getCurrentWeekConsumption();
    this.getLastWeekConsumption();
    this.getLastMonthBalance();
    this.fillExpenseEvolutionChart();
  }

  getCurrentCashAmount(): void {
    this.currentCashAmountIsLoading = true;
    this.dashboardService.getCurrentCashAmount().pipe().subscribe((response: number): void => {
      this.currentCashAmount = response;
      this.currentCashAmountIsLoading = false;
    });
  }

  getCurrentWeekConsumption(): void {
    this.currentWeekConsumptionIsLoading = true;
    this.dashboardService.getCurrentWeekConsumption().pipe().subscribe((response: number): void => {
      this.currentWeekConsumption = response;
      this.currentWeekConsumptionIsLoading = false;
    });
  }

  getLastWeekConsumption(): void {
    this.lastWeekConsumptionIsLoading = true;
    this.dashboardService.getLastWeekConsumption().pipe().subscribe((response: number): void => {
      this.lastWeekConsumption = response;
      this.lastWeekConsumptionIsLoading = false;
    });
  }

  getLastMonthBalance(): void {
    this.lastMonthBalanceIsLoading = true;
    this.dashboardService.getLastMonthBalance().pipe().subscribe((response: number): void => {
      this.lastMonthBalance = response;
      this.lastMonthBalanceIsLoading = false;
    });
  }

  fillExpenseEvolutionChart(consumptionData?: ConsumptionEvolutionData): void {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);
    const textColor: string = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary: string = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder: string = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Févirier',
          data: [28, 48, 40, 19, 86],
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--teal-500')
        },
        {
          label: 'Janvier',
          data: [12, 51, 62, 33, 21, 62, 45],
          fill: true,
          borderColor: documentStyle.getPropertyValue('--primary-color-900'),
          tension: 0.4,
          backgroundColor: 'rgba(164,118,23,0.2)'
        }
      ]
    };

    // const currentMonth: string = consumptionData?.currentMonthData.month ? consumptionData?.currentMonthData.month.toString() : '';
    // const lastMonth: string = consumptionData?.lastMonthData.month ? consumptionData?.lastMonthData.month.toString() : '';
    // this.data = {
    //   labels: consumptionData?.daysOfMonth,
    //   datasets: [
    //     {
    //       label: this.translatePipe.transform(currentMonth),
    //       data: consumptionData?.currentMonthData?.data,
    //       fill: false,
    //       borderDash: [5, 5],
    //       tension: 0.4,
    //       borderColor: documentStyle.getPropertyValue('--teal-500')
    //     },
    //     {
    //       label: this.translatePipe.transform(lastMonth),
    //       data: consumptionData?.lastMonthData?.data,
    //       fill: true,
    //       borderColor: documentStyle.getPropertyValue('--primary-color-900'),
    //       tension: 0.4,
    //       backgroundColor: 'rgba(164,118,23,0.2)'
    //     }
    //   ]
    // };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.7,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }

}
