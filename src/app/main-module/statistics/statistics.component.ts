import {Component, OnInit} from '@angular/core';
import {GenericObject} from "../../shared/types/generic-object";
import {TranslatePipe} from "../../shared/pipes/translate.pipe";
import {CashFlowType} from "../cash-flow-registry/types/cash-flow-type";
import {getUTCDateFrom} from "../../shared/utils/utils-functions";
import {SearchType} from "./types/search-type";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [TranslatePipe]
})
export class StatisticsComponent implements OnInit {
  data: any;
  options: any;
  cashFlowTypeList: GenericObject[] = [];
  searchWithList: GenericObject[] = [];
  categoriesList: GenericObject[] = [];
  yearsList: GenericObject[] = [];

  constructor(
    private translate: TranslatePipe,
  ) {
    this.initChartOptions();
    this.prepareCashFlowTypeList();
    this.prepareSearchWithList();
  }

  ngOnInit(): void {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Consommation',
          backgroundColor: documentStyle.getPropertyValue('--primary-color-700-transparent'),
          borderColor: documentStyle.getPropertyValue('--primary-color-700'),
          data: [80, 59, 50, 44, 35, 25, 14, 12, 10, 9, 5, 2]
        },
      ]
    };
  }

  prepareCashFlowTypeList(): void {
    this.cashFlowTypeList.push({
      key: this.translate.transform(CashFlowType.GAIN.toString()),
      value: CashFlowType.GAIN.toString()
    });

    this.cashFlowTypeList.push({
      key: this.translate.transform(CashFlowType.EXPENSE.toString()),
      value: CashFlowType.EXPENSE.toString()
    });
  }

  prepareSearchWithList(): void {
    this.searchWithList.push({
      key: this.translate.transform(SearchType.PER_CATEGORY.toString()),
      value: SearchType.PER_CATEGORY.toString()
    });

    this.searchWithList.push({
      key: this.translate.transform(SearchType.PER_MONTH.toString()),
      value: SearchType.PER_MONTH.toString()
    });
  }

  initChartOptions(): void {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);
    const textColor: string = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary: string = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder: string = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      indexAxis: 'x',
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
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: true
          }
        },
        y: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: true
          }
        }
      }
    };
  }

  selectDate(date: Date): void {
    getUTCDateFrom(date);
  }

}
