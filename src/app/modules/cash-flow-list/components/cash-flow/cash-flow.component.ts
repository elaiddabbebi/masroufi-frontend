import { Component } from '@angular/core';
import {CashFlowCategory} from "../cash-flow-category/types/cash-flow-category";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";
import {CashFlowCategoryService} from "../cash-flow-category/services/cash-flow-category.service";
import {NotificationService} from "../../../../shared/services/notification.service";
import {tap} from "rxjs";
import {CashFlowService} from "./services/cash-flow.service";
import {CashFlow} from "./types/cash-flow";
import {CashFlowStatus} from "./types/cash-flow-status";

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css'],
  providers: [TranslatePipe, NotificationService, CashFlowCategoryService, CashFlowService]
})
export class CashFlowComponent {
  cashFlowList: CashFlow[] = [];
  cashFlowDetailsDialog: boolean = false;
  deleteCashFlowDialog: boolean = false;
  cashFlowDetailsForm: FormGroup;
  saveIsLoading: boolean = false;
  deleteIsLoading: boolean = false;
  cashFlowDetailsDialogHeader: string = '';
  mode: string = '';
  currentCashFlowUuid: string = '';
  currentCashFlowName: string = '';

  constructor(
    private router: Router,
    private translate: TranslatePipe,
    private cashFlowService: CashFlowService,
    private categoryService: CashFlowCategoryService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
  ) {
    this.cashFlowDetailsForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      gain: new FormControl(false, []),
      expense: new FormControl(false, []),
    });
  }

  ngOnInit(): void {
    this.searchCashFlow();
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
    this.cashFlowDetailsDialogHeader = 'ADD_CASH_FLOW';
    this.mode = 'ADD';
    this.showCashFlowDetailsDialog();
  }

  editCashFlow(category: any): void {
    this.currentCashFlowUuid = category.uuid;
    this.cashFlowDetailsForm.get('name')?.setValue(category.name);
    this.cashFlowDetailsForm.get('gain')?.setValue(category.gain);
    this.cashFlowDetailsForm.get('expense')?.setValue(category.expense);
    this.cashFlowDetailsDialogHeader = 'EDIT_CASH_FLOW';
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
    this.cashFlowService.searchCashFlow().pipe(
      tap({
        next: response => {
          this.cashFlowList = response;
        },
        error: error => {
          console.log(error);
        }
      })
    ).subscribe();
  }

  createCashFlow(): void {
    if (this.cashFlowDetailsForm.invalid) {
      return;
    }
    this.saveIsLoading = true;
    const cashFlow: CashFlow = {
      name: this.cashFlowDetailsForm.value.name,
      gain: this.cashFlowDetailsForm.value.gain,
      expense: this.cashFlowDetailsForm.value.expense,
      systemCashFlow: true,
      status: CashFlowStatus.VALIDATED
    }
    this.cashFlowService.createCashFlow(cashFlow).pipe(
      tap({
        next: response => {
          this.hideCashFlowDetailsDialog();
          this.notificationService.notifySuccess('CASH_FLOW_CREATION_SUCCESS');
          this.searchCashFlow();
          this.saveIsLoading = false;
        },
        error: error => {
          console.log(error);
          this.notificationService.notifyError('CASH_FLOW_CREATION_ERROR');
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
    const cashFlow: CashFlow = {
      name: this.cashFlowDetailsForm.value.name,
      gain: this.cashFlowDetailsForm.value.gain,
      expense: this.cashFlowDetailsForm.value.expense,
    }
    this.cashFlowService.updateCashFlow(this.currentCashFlowUuid, cashFlow).pipe(
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
    this.cashFlowService.deleteCashFlow(this.currentCashFlowUuid).pipe(
      tap({
        next: response => {
          this.hideCashFlowCategoryDialog();
          this.searchCashFlow();
          this.notificationService.notifySuccess('DELETE_CASH_FLOW_SUCCESS');
          this.deleteIsLoading = false;
        },
        error: error => {
          console.log(error);
          this.deleteIsLoading = false;
          this.notificationService.notifyError('DELETE_CASH_FLOW_ERROR');
        }
      })
    ).subscribe();
  }

  protected readonly CashFlowStatus = CashFlowStatus;
}
