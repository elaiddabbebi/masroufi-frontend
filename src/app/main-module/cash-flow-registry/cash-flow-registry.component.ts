import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslatePipe} from "../../shared/pipes/translate.pipe";
import {NotificationService} from "../../shared/services/notification.service";
import {tap} from "rxjs";
import {CashFlowRegistry} from "./types/cash-flow-registry";
import {CashFlowRegistryService} from "./services/cash-flow-registry.service";
import {GenericObject} from "../../shared/types/generic-object";
import {CashFlowType} from "./types/cash-flow-type";
import {CashFlowService} from "../cash-flow-list/components/cash-flow/services/cash-flow.service";
import {
  CashFlowCategoryService
} from "../cash-flow-list/components/cash-flow-category/services/cash-flow-category.service";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {AutoCompleteItem} from "../../shared/types/auto-complete-item";
import {PrimeNGConfig} from "primeng/api";
import {PrimeNgLocaleSettingsBuilder} from "../../shared/utils/prime-ng-locale-settings-builder";
import {CustomerCashFlowRegistrySearchCriteria} from "./types/customer-cash-flow-registry-search-criteria";
import {SortOrder} from "../../shared/types/sort-order";
import {ResultSetResponse} from "../../shared/types/result-set-response";
import {PageChangeEvent} from "../../shared/types/page-change-event";
import {EmptyResultSet} from "../../shared/utils/empty-result-set";
import {getUTCDateFrom} from "../../shared/utils/utils-functions";

@Component({
  selector: 'app-cash-flow-registry',
  templateUrl: './cash-flow-registry.component.html',
  styleUrls: ['./cash-flow-registry.component.css'],
  providers: [CashFlowRegistryService, NotificationService, CashFlowService, CashFlowCategoryService]
})
export class CashFlowRegistryComponent {
  cashFlowResultSet: ResultSetResponse<CashFlowRegistry> = EmptyResultSet;
  cashFlowDetailsDialog: boolean = false;
  deleteCashFlowDialog: boolean = false;
  cashFlowDetailsForm: FormGroup;
  saveIsLoading: boolean = false;
  deleteIsLoading: boolean = false;
  cashFlowDetailsDialogHeader: string = '';
  mode: string = '';
  currentCashFlowUuid: string = '';
  currentCashFlowName: string = '';
  allCashFlowCategories: AutoCompleteItem[] = [];
  allCashFlowList: AutoCompleteItem[] = [];
  filteredCashFlowCategories: AutoCompleteItem[] = [];
  filteredCashFlowList: AutoCompleteItem[] = [];
  cashFlowTypeList: GenericObject[] = [];
  searchCriteria: CustomerCashFlowRegistrySearchCriteria = new CustomerCashFlowRegistrySearchCriteria();

  constructor(
    private translate: TranslatePipe,
    private cashFlowRegistryService: CashFlowRegistryService,
    private cashFlowService: CashFlowService,
    private cashFlowCategoryService: CashFlowCategoryService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private primeNGConfig: PrimeNGConfig,
  ) {
    this.primeNGConfig.setTranslation(PrimeNgLocaleSettingsBuilder.getLocaleSettings());
    this.cashFlowDetailsForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      amount: new FormControl(0, [Validators.required]),
      date: new FormControl(getUTCDateFrom(new Date()), [Validators.required]),
    });
    this.prepareCashFlowTypeList();
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

  ngOnInit(): void {
    this.initSearchCriteria();
    this.searchCashFlow();
    this.getCashFlowCategoryNameList();
    this.getCashFlowNameList();
  }

  initSearchCriteria(): void {
    this.searchCriteria = {
      page: 1,
      size: 10,
      primarySortField: 'date',
      primarySortOrder: SortOrder.DESC,
      secondarySortField: 'id',
      secondarySortOrder: SortOrder.DESC,
    }
  }

  selectDate(date: Date): void {
    this.cashFlowDetailsForm.get('date')?.setValue(getUTCDateFrom(date));
  }

  filterCashFlowItems(event: AutoCompleteCompleteEvent): void {
    let filtered: AutoCompleteItem[] = [];
    let query: string = event.query;

    for (let i = 0; i < this.allCashFlowList.length; i++) {
      let item: AutoCompleteItem = this.allCashFlowList[i];
      if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }

    this.filteredCashFlowList = filtered;
  }

  filterCategoryItems(event: AutoCompleteCompleteEvent): void {
    let filtered: AutoCompleteItem[] = [];
    let query: string = event.query;

    for (let i = 0; i < this.allCashFlowCategories.length; i++) {
      let item: AutoCompleteItem = this.allCashFlowCategories[i];
      if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }

    this.filteredCashFlowCategories = filtered;
  }

  hideCashFlowDetailsDialog(): void {
    this.cashFlowDetailsDialog = false;
  }

  showCashFlowDetailsDialog(): void {
    this.cashFlowDetailsDialog = true;
  }

  hideCashFlowCategoryDialog(): void {
    this.deleteCashFlowDialog = false;
  }

  showDeleteCashFlowDialog(): void {
    this.deleteCashFlowDialog = true;
  }

  addCashFlow(): void {
    this.cashFlowDetailsForm.reset();
    this.cashFlowDetailsForm.get('type')?.setValue(CashFlowType.EXPENSE);
    this.cashFlowDetailsForm.get('date')?.setValue(getUTCDateFrom(new Date()));
    this.cashFlowDetailsDialogHeader = 'ADD_CASH_FLOW_REGISTRY';
    this.mode = 'ADD';
    this.showCashFlowDetailsDialog();
  }

  editCashFlow(cashFlow: any): void {
    this.currentCashFlowUuid = cashFlow.uuid;
    this.cashFlowDetailsForm.get('name')?.setValue({
      label: cashFlow.name,
      value: cashFlow.name
    });
    this.cashFlowDetailsForm.get('category')?.setValue({
      label: cashFlow.category,
      value: cashFlow.category
    });
    this.cashFlowDetailsForm.get('type')?.setValue(cashFlow.type);
    this.cashFlowDetailsForm.get('date')?.setValue(getUTCDateFrom(new Date(cashFlow.date)));
    this.cashFlowDetailsForm.get('amount')?.setValue(cashFlow.amount);
    this.cashFlowDetailsDialogHeader = 'EDIT_CASH_FLOW_REGISTRY';
    this.mode = 'EDIT';
    this.showCashFlowDetailsDialog();
  }

  deleteCashFlow(cashFlow: any): void {
    this.currentCashFlowName = cashFlow.name;
    this.currentCashFlowUuid = cashFlow.uuid;
    this.showDeleteCashFlowDialog();
  }

  saveCashFlow(event: Event): void {
    event.stopPropagation();
    if (this.mode === 'ADD') {
      this.createCashFlow();
    } else {
      this.updateCashFlow();
    }
  }

  get cashFlowDetailsControls() {
    return this.cashFlowDetailsForm.controls;
  }

  searchCashFlow(): void {
    this.cashFlowRegistryService.search(this.searchCriteria).pipe(
      tap({
        next: (response: ResultSetResponse<CashFlowRegistry>): void => {
          this.cashFlowResultSet = response;
        },
        error: error => {
          console.log(error);
        }
      })
    ).subscribe();
  }

  onPageChange(event: PageChangeEvent): void {
    this.searchCriteria.page = event.page;
    this.searchCriteria.size = event.size;
    this.searchCashFlow();
  }

  getCashFlowNameList(): void {
    this.cashFlowService.getAllNameList().pipe().subscribe((response: string[]): void => {
      this.allCashFlowList = response.map(item => ({ label: item, value: item }));
    })
  }

  getCashFlowCategoryNameList(): void {
    this.cashFlowCategoryService.getAllNameList().pipe().subscribe((response: string[]): void => {
      this.allCashFlowCategories = response.map(item => ({ label: item, value: item }));
    })
  }

  getSelectedCashFlowName(): string {
    if (typeof this.cashFlowDetailsForm.value.name === 'string') {
      return this.cashFlowDetailsForm.value.name;
    } else {
      return this.cashFlowDetailsForm.value.name?.value;
    }
  }

  getSelectedCashFlowCategoryName(): string {
    if (typeof this.cashFlowDetailsForm.value.category === 'string') {
      return this.cashFlowDetailsForm.value.category;
    } else {
      return this.cashFlowDetailsForm.value.category?.value;
    }
  }

  buildCashFlowToBeSaved(): CashFlowRegistry {
    return {
      name: this.getSelectedCashFlowName(),
      category: this.getSelectedCashFlowCategoryName(),
      type: this.cashFlowDetailsForm.value.type,
      date: this.cashFlowDetailsForm.value.date,
      amount: this.cashFlowDetailsForm.value.amount,
    }

  }

  createCashFlow(): void {
    if (this.cashFlowDetailsForm.invalid) {
      return;
    }
    this.saveIsLoading = true;
    const cashFlow: CashFlowRegistry = this.buildCashFlowToBeSaved();
    this.cashFlowRegistryService.create(cashFlow).pipe(
      tap({
        next: response => {
          this.hideCashFlowDetailsDialog();
          this.notificationService.notifySuccess('CASH_FLOW_REGISTRY_CREATION_SUCCESS');
          this.searchCashFlow();
          this.saveIsLoading = false;
        },
        error: error => {
          console.log(error);
          this.notificationService.notifyError('CASH_FLOW_REGISTRY_CREATION_ERROR');
          this.saveIsLoading = false;
        }
      })
    ).subscribe();
  }

  updateCashFlow(): void {
    if (this.cashFlowDetailsForm.invalid) {
      return;
    }
    this.saveIsLoading = true;
    const cashFlow: CashFlowRegistry = this.buildCashFlowToBeSaved();
    this.cashFlowRegistryService.update(this.currentCashFlowUuid, cashFlow).pipe(
      tap({
        next: response => {
          this.hideCashFlowDetailsDialog();
          this.notificationService.notifySuccess('UPDATE_SUCCESS');
          this.searchCashFlow();
          this.saveIsLoading = false;
        },
        error: error => {
          console.log(error);
          this.notificationService.notifyError('UPDATE_ERROR');
          this.saveIsLoading = false;
        }
      })
    ).subscribe();
  }

  confirmDeleteCashFlow(event: Event): void {
    event.stopPropagation();
    this.deleteIsLoading = true;
    this.cashFlowRegistryService.delete(this.currentCashFlowUuid).pipe(
      tap({
        next: response => {
          this.hideCashFlowCategoryDialog();
          this.searchCashFlow();
          this.notificationService.notifySuccess('DELETE_CASH_FLOW_REGISTRY_SUCCESS');
          this.deleteIsLoading = false;
        },
        error: error => {
          console.log(error);
          this.deleteIsLoading = false;
          this.notificationService.notifyError('DELETE_CASH_FLOW_REGISTRY_ERROR');
        }
      })
    ).subscribe();
  }

  protected readonly CashFlowType = CashFlowType;
}
