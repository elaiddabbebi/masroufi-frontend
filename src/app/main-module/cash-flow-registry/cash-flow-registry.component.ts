import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CashFlowCategory} from "../cash-flow-list/components/cash-flow-category/types/cash-flow-category";
import {Router} from "@angular/router";
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
import {LocaleSettings} from "primeng/calendar";
import {PrimeNGConfig} from "primeng/api";
import {PrimeNgLocaleSettingsBuilder} from "../../shared/utils/prime-ng-locale-settings-builder";

@Component({
  selector: 'app-cash-flow-registry',
  templateUrl: './cash-flow-registry.component.html',
  styleUrls: ['./cash-flow-registry.component.css'],
  providers: [CashFlowRegistryService, NotificationService, CashFlowService, CashFlowCategoryService]
})
export class CashFlowRegistryComponent {
  cashFlowRegistries: CashFlowRegistry[] = [];
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


  constructor(
    private router: Router,
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
      date: new FormControl(new Date(), [Validators.required]),
    });

    this.cashFlowTypeList.push({
      key: this.translate.transform(CashFlowType.GAIN.toString()),
      value: CashFlowType.GAIN.toString()
    });

    this.cashFlowTypeList.push({
      key: this.translate.transform(CashFlowType.EXPENSE.toString()),
      value: CashFlowType.EXPENSE.toString()
    });
  }

  selectDate(dateMeta: Date): void {
    this.cashFlowDetailsForm.get('date')?.setValue(new Date(Date.UTC(dateMeta.getFullYear(), dateMeta.getMonth(), dateMeta.getDate())));
  }

  ngOnInit(): void {
    this.searchCashFlow();
    this.getCashFlowCategoryNameList();
    this.getCashFlowNameList();
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
    this.cashFlowDetailsForm.get('date')?.setValue(new Date());
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
    this.cashFlowDetailsForm.get('date')?.setValue(new Date(cashFlow.date));
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
    this.cashFlowRegistryService.search().pipe(
      tap({
        next: (response: CashFlowRegistry[]): void => {
          this.cashFlowRegistries = response;
        },
        error: error => {
          console.log(error);
        }
      })
    ).subscribe();
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
