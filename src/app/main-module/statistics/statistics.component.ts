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
import {NotificationService} from "../../shared/services/notification.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [TranslatePipe, StatisticsService, NotificationService]
})
export class StatisticsComponent implements OnInit {
  data: any;
  options: any;
  cashFlowTypeList: GenericObject[] = [];
  searchWithList: GenericObject[] = [];
  categoriesList: GenericObject[] = [];
  yearsList: number[] = [];
  searchFromGroup: FormGroup;
  searchStatisticsIsLoading: boolean = false;
  chartTitle: string = '';

  constructor(
    private translate: TranslatePipe,
    private formBuilder: FormBuilder,
    private statisticsService: StatisticsService,
    private notificationService: NotificationService,
  ) {
    this.searchFromGroup = this.formBuilder.group({
      cashFlowType: new FormControl(CashFlowType.EXPENSE, [Validators.required]),
      searchType: new FormControl(StatisticsSearchType.PER_CATEGORY, [Validators.required]),
      categoryUuid: new FormControl(null, []),
      year: new FormControl(null, []),
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
    this.getYearsList();
  }

  getChartTitle(): string {
    if (this.searchFromGroup.value.cashFlowType === CashFlowType.EXPENSE) {
      if (this.searchFromGroup.value.searchType === StatisticsSearchType.PER_CATEGORY) {
        return 'EXPENSE_PER_CATEGORY';
      } else if (this.searchFromGroup.value.searchType === StatisticsSearchType.PER_MONTH) {
        return 'EXPENSE_PER_MONTH';
      } else {
        return '';
      }
    } else if (this.searchFromGroup.value.cashFlowType === CashFlowType.GAIN) {
      if (this.searchFromGroup.value.searchType === StatisticsSearchType.PER_CATEGORY) {
        return 'GAIN_PER_CATEGORY';
      } else if (this.searchFromGroup.value.searchType === StatisticsSearchType.PER_MONTH) {
        return 'GAIN_PER_MONTH';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  launchSearch(event: Event): void {
    if (this.searchFromGroup.valid) {
      event.preventDefault();
      this.searchStatistics();
    }
  }

  searchStatistics(): void {
    this.searchStatisticsIsLoading = true;
    this.chartTitle = this.getChartTitle();
    const searchCriteria: StatisticsSearchCriteria = {
      cashFlowType: this.searchFromGroup.value.cashFlowType,
      searchType: this.searchFromGroup.value.searchType,
      categoryUuid: this.searchFromGroup.value.categoryUuid,
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
                backgroundColor: documentStyle.getPropertyValue(CssRootVariables.PRIMARY_COLOR_700_LITTLE_TRANSPARENT),
                borderColor: documentStyle.getPropertyValue(CssRootVariables.PRIMARY_COLOR_900),
                data: response.data
              },
            ]
          };
          this.searchStatisticsIsLoading = false;
        },
        error: (error) => {
          this.searchStatisticsIsLoading = false;
          this.notificationService.notifyError('ERROR_OCCURRED');
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

  getYearsList(): void {
    this.statisticsService.getCustomerYearsList().pipe(
      tap({
        next: (response: number[]): void => {
          this.yearsList = response;
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

  onSearchWithChanged(): void {
    if (this.searchFromGroup.value.searchType === StatisticsSearchType.PER_MONTH) {
      this.searchFromGroup.get('startDate')?.setValue(null);
      this.searchFromGroup.get('endDate')?.setValue(null);
      this.searchFromGroup.get('categoryUuid')?.setValue(null);

      this.searchFromGroup.get('startDate')?.setValidators(null);
      this.searchFromGroup.get('endDate')?.setValidators(null);
      this.searchFromGroup.get('year')?.setValidators([Validators.required]);

      this.searchFromGroup.get('startDate')?.updateValueAndValidity();
      this.searchFromGroup.get('endDate')?.updateValueAndValidity();
      this.searchFromGroup.get('categoryUuid')?.updateValueAndValidity();
      this.searchFromGroup.get('year')?.updateValueAndValidity();
    } else if (this.searchFromGroup.value.searchType === StatisticsSearchType.PER_CATEGORY) {
      this.searchFromGroup.get('year')?.setValue(null);

      this.searchFromGroup.get('year')?.setValidators(null);
      this.searchFromGroup.get('startDate')?.setValidators([Validators.required]);
      this.searchFromGroup.get('endDate')?.setValidators([Validators.required]);

      this.searchFromGroup.get('year')?.updateValueAndValidity();
      this.searchFromGroup.get('startDate')?.updateValueAndValidity();
      this.searchFromGroup.get('endDate')?.updateValueAndValidity();
    }
    this.searchFromGroup.updateValueAndValidity();
  }

  protected readonly StatisticsSearchType = StatisticsSearchType;
}
