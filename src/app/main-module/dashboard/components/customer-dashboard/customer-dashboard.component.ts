import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../services/dashboard.service";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  currentCashAmount: number = 0;
  lastWeekConsumption: number = 0;
  lastMonthBalance: number = 0;
  incomeEvolution: number = 0;
  currentCashAmountIsLoading: boolean = false;
  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.getCurrentCashAmount();
  }

  getCurrentCashAmount(): void {
    this.currentCashAmountIsLoading = true;
    this.dashboardService.getCurrentCashAmount().pipe().subscribe((response: number): void => {
      this.currentCashAmount = response;
      this.currentCashAmountIsLoading = false;
    });
  }

}
