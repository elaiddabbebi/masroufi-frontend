import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../services/dashboard.service";
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";
import {ConsumptionEvolutionData} from "../../types/consumption-evolution-data";
import {ExpenseRevenueEvolutionData} from "../../types/expense-revenue-evolution-data";
import {Month} from "../../../../shared/enums/month";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
  providers: [TranslatePipe]
})
export class CustomerDashboardComponent implements OnInit {

  currentCashAmount: number = 0;
  currentWeekConsumption: number = 0;
  currentMonthConsumption: number = 0;
  lastMonthConsumption: number = 0;
  currentMonthBalance: number = 0;
  lastMonthBalance: number = 0;
  currentYearRevenue: number = 0;
  currentYearBalance: number = 0;

  currentCashAmountIsLoading: boolean = false;
  currentWeekConsumptionIsLoading: boolean = false;
  currentMonthConsumptionIsLoading: boolean = false;
  lastMonthConsumptionIsLoading: boolean = false;
  currentMonthBalanceIsLoading: boolean = false;
  lastMonthBalanceIsLoading: boolean = false;
  currentYearRevenueIsLoading: boolean = false;
  currentYearBalanceIsLoading: boolean = false;

  consumptionEvolutionDataIsLoading: boolean = false;
  currentYearExpenseRevenueEvolutionIsLoading: boolean = false;

  expenseEvolutionData: any;
  expenseRevenueEvolutionData: any;
  options: any;

  constructor(
    private dashboardService: DashboardService,
    private translatePipe: TranslatePipe,
  ) {}

  ngOnInit(): void {
    this.initChartOptions();

    this.getCurrentCashAmount();
    this.getCurrentWeekConsumption();
    this.getCurrentMonthConsumption();
    this.getLastMonthConsumption();

    this.getCurrentYearRevenue();
    this.getCurrentYearBalance();
    this.getCurrentMonthBalance();
    this.getLastMonthBalance();

    this.getConsumptionEvolution();
    this.getCurrentYearExpenseRevenueEvolution();
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

  getCurrentMonthConsumption(): void {
    this.currentMonthConsumptionIsLoading = true;
    this.dashboardService.getCurrentMonthConsumption().pipe().subscribe((response: number): void => {
      this.currentMonthConsumption = response;
      this.currentMonthConsumptionIsLoading = false;
    });
  }

  getLastMonthConsumption(): void {
    this.lastMonthConsumptionIsLoading = true;
    this.dashboardService.getLastMonthConsumption().pipe().subscribe((response: number): void => {
      this.lastMonthConsumption = response;
      this.lastMonthConsumptionIsLoading = false;
    });
  }

  getCurrentMonthBalance(): void {
    this.currentMonthBalanceIsLoading = true;
    this.dashboardService.getCurrentMonthBalance().pipe().subscribe((response: number): void => {
      this.currentMonthBalance = response;
      this.currentMonthBalanceIsLoading = false;
    });
  }

  getLastMonthBalance(): void {
    this.lastMonthBalanceIsLoading = true;
    this.dashboardService.getLastMonthBalance().pipe().subscribe((response: number): void => {
      this.lastMonthBalance = response;
      this.lastMonthBalanceIsLoading = false;
    });
  }

  getCurrentYearRevenue(): void {
    this.currentYearRevenueIsLoading = true;
    this.dashboardService.getCurrentYearRevenue().pipe().subscribe((response: number): void => {
      this.currentYearRevenue = response;
      this.currentYearRevenueIsLoading = false;
    });
  }

  getCurrentYearBalance(): void {
    this.currentYearBalanceIsLoading = true;
    this.dashboardService.getCurrentYearBalance().pipe().subscribe((response: number): void => {
      this.currentYearBalance = response;
      this.currentYearBalanceIsLoading = false;
    });
  }

  getConsumptionEvolution(): void {
    this.consumptionEvolutionDataIsLoading = true;
    this.dashboardService.getConsumptionEvolution().pipe().subscribe((response: ConsumptionEvolutionData): void => {
      this.fillExpenseEvolutionChart(response);
      this.consumptionEvolutionDataIsLoading = false;
    });
  }

  getCurrentYearExpenseRevenueEvolution(): void {
    this.currentYearExpenseRevenueEvolutionIsLoading = true;
    this.dashboardService.getCurrentYearExpenseRevenueEvolution().pipe().subscribe((response: ExpenseRevenueEvolutionData): void => {
      this.fillExpenseRevenueEvolutionData(response);
      this.currentYearExpenseRevenueEvolutionIsLoading = false;
    });
  }

  fillExpenseRevenueEvolutionData(expenseRevenueEvolutionData: ExpenseRevenueEvolutionData): void {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);

    this.expenseRevenueEvolutionData = {
      labels: expenseRevenueEvolutionData.months.map((month: Month) => this.translatePipe.transform(month)),
      datasets: [
        {
          label: this.translatePipe.transform('REVENUE'),
          data: expenseRevenueEvolutionData.revenueEvolution.map(monthAmount => monthAmount.amount),
          fill: true,
          borderColor: documentStyle.getPropertyValue('--primary-color-900'),
          tension: 0.3,
          backgroundColor: documentStyle.getPropertyValue('--primary-color-900-transparent')
        },
        {
          label: this.translatePipe.transform('EXPENSE'),
          data: expenseRevenueEvolutionData.expenseEvolution.map(monthAmount => monthAmount.amount),
          fill: false,
          borderDash: [9, 2],
          tension: 0.3,
          borderColor: documentStyle.getPropertyValue('--primary-color-300'),
          backgroundColor: documentStyle.getPropertyValue('--primary-color-300-transparent'),
        }
      ]
    };
  }

  fillExpenseEvolutionChart(consumptionData?: ConsumptionEvolutionData): void {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);

    const currentMonth: string = consumptionData?.currentMonthData.month ? consumptionData?.currentMonthData.month.toString() : '';
    const lastMonth: string = consumptionData?.lastMonthData.month ? consumptionData?.lastMonthData.month.toString() : '';
    this.expenseEvolutionData = {
      labels: consumptionData?.daysOfMonth,
      datasets: [
        {
          label: this.translatePipe.transform(currentMonth),
          data: consumptionData?.currentMonthData?.data,
          fill: true,
          borderColor: documentStyle.getPropertyValue('--primary-color-900'),
          tension: 0.3,
          backgroundColor: documentStyle.getPropertyValue('--primary-color-900-very-transparent')
        },
        {
          label: this.translatePipe.transform(lastMonth),
          data: consumptionData?.lastMonthData?.data,
          fill: false,
          borderDash: [9, 2],
          tension: 0.3,
          borderColor: documentStyle.getPropertyValue('--primary-color-300'),
          backgroundColor: documentStyle.getPropertyValue('--primary-color-300-very-transparent'),
          hidden: true
        }
      ]
    };
  }

  initChartOptions(): void {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);
    const textColor: string = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary: string = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder: string = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.65,
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
