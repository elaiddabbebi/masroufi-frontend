import {Component, OnInit} from '@angular/core';
import {GenericObject} from "../../shared/types/generic-object";
import {TranslatePipe} from "../../shared/pipes/translate.pipe";
import {CashFlowType} from "../cash-flow-registry/types/cash-flow-type";
import {getFirstDateOfYear, getUTCDateFrom} from "../../shared/utils/utils-functions";
import {StatisticsSearchType} from "./types/statistics-search-type";
import {CssRootVariables} from "../../shared/constants/css-root-variables";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StatisticsService} from "./services/statistics.service";
import {StatisticsResult} from "./types/statistics-result";
import {StatisticsSearchCriteria} from "./types/statistics-search-criteria";
import {tap} from "rxjs";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [TranslatePipe, StatisticsService]
})
export class StatisticsComponent implements OnInit {
  data: any;
  options: any;
  cashFlowTypeList: GenericObject[] = [];
  searchWithList: GenericObject[] = [];
  categoriesList: GenericObject[] = [];
  yearsList: GenericObject[] = [];
  searchFromGroup: FormGroup;
  searchStatisticsIsLoading: boolean = false;

  constructor(
    private translate: TranslatePipe,
    private formBuilder: FormBuilder,
    private statisticsService: StatisticsService,
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
    this.searchStatistics();
    this.getCashFlowCategories();
  }

  launchSearch(event: Event): void {
    event.preventDefault();
    this.searchStatistics();
  }

  searchStatistics(): void {
    this.searchStatisticsIsLoading = true;
    const searchCriteria: StatisticsSearchCriteria = {
      cashFlowType: this.searchFromGroup.value.cashFlowType,
      searchType: this.searchFromGroup.value.searchType,
      category: this.searchFromGroup.value.category,
      year: this.searchFromGroup.value.year,
      startDate: this.searchFromGroup.value.startDate,
      endDate: this.searchFromGroup.value.endDate,
    }
    this.statisticsService.search(searchCriteria).pipe(
      tap({
        next: (response: StatisticsResult): void => {
          const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);
          if (response.translateLabels) {
            response.labels = response.labels.map(label => this.translate.transform(label));
          }
          this.data = {
            labels: response.labels,
            datasets: [
              {
                label: this.translate.transform(searchCriteria.cashFlowType),
                backgroundColor: documentStyle.getPropertyValue(CssRootVariables.PRIMARY_COLOR_900_TRANSPARENT),
                borderColor: documentStyle.getPropertyValue(CssRootVariables.PRIMARY_COLOR_900),
                data: response.data
              },
            ]
          };
          this.searchStatisticsIsLoading = false;
        },
        error: (error) => {
          this.searchStatisticsIsLoading = false;
          console.error(error);
        }
      })
    ).subscribe()
  }

  getCashFlowCategories(): void {
    this.statisticsService.getCustomerCashFlowCategories(this.searchFromGroup.value.cashFlowType).pipe(
      tap({
        next: (response: GenericObject[]): void => {
          this.categoriesList = response;
        }
      })
    ).subscribe();
  }

  clearSearchForm(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.searchFromGroup.reset();
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
