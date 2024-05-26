import {Component, OnInit} from '@angular/core';
import {GenericObject} from "../../shared/types/generic-object";
import {TranslatePipe} from "../../shared/pipes/translate.pipe";
import {CashFlowType} from "../cash-flow-registry/types/cash-flow-type";
import {getFirstDateOfYear, getUTCDateFrom} from "../../shared/utils/utils-functions";
import {StatisticsSearchType} from "./types/statistics-search-type";
import {CssRootVariables} from "../../shared/constants/css-root-variables";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
  searchFromGroup: FormGroup;

  constructor(
    private translate: TranslatePipe,
    private formBuilder: FormBuilder,
  ) {
    this.searchFromGroup = this.formBuilder.group({
      cashFlowType: new FormControl(CashFlowType.EXPENSE, [Validators.required]),
      searchType: new FormControl(StatisticsSearchType.PER_CATEGORY, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      year: new FormControl(null, [Validators.required]),
      startDate: new FormControl(getUTCDateFrom(getFirstDateOfYear()), [Validators.required]),
      endDate: new FormControl(getUTCDateFrom(new Date()), [Validators.required]),
    });
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
          backgroundColor: documentStyle.getPropertyValue(CssRootVariables.PRIMARY_COLOR_700_TRANSPARENT),
          borderColor: documentStyle.getPropertyValue(CssRootVariables.PRIMARY_COLOR_700),
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
      key: this.translate.transform(StatisticsSearchType.PER_CATEGORY.toString()),
      value: StatisticsSearchType.PER_CATEGORY.toString()
    });

    this.searchWithList.push({
      key: this.translate.transform(StatisticsSearchType.PER_MONTH.toString()),
      value: StatisticsSearchType.PER_MONTH.toString()
    });
  }

  initChartOptions(): void {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);
    const textColor: string = documentStyle.getPropertyValue(CssRootVariables.TEXT_COLOR);
    const textColorSecondary: string = documentStyle.getPropertyValue(CssRootVariables.TEXT_COLOR_SECONDARY);
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
