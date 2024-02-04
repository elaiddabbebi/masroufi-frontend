import {Component, OnInit} from '@angular/core';
import {CashFlowCategory} from "./types/cash-flow-category";
import {Router} from "@angular/router";
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";
import {NotificationService} from "../../../../shared/services/notification.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CashFlowCategoryService} from "./services/cash-flow-category.service";
import {tap} from "rxjs";
import {CashFlowCategoryStatus} from "./types/cash-flow-category-status";
import {CategoryValidators} from "../../../../shared/validators/category-validators";

@Component({
  selector: 'app-cash-flow-category',
  templateUrl: './cash-flow-category.component.html',
  styleUrls: ['./cash-flow-category.component.css'],
  providers: [TranslatePipe, NotificationService, CashFlowCategoryService]
})
export class CashFlowCategoryComponent implements OnInit {

  cashFlowCategoryList: CashFlowCategory[] = [];
  categoryDetailsDialog: boolean = false;
  deleteCategoryDialog: boolean = false;
  categoryDetailsForm: FormGroup;
  saveIsLoading: boolean = false;
  deleteIsLoading: boolean = false;
  categoryDetailsDialogHeader: string = '';
  mode: string = '';
  currentCategoryUuid: string = '';
  currentCategoryName: string = '';

  constructor(
    private router: Router,
    private translate: TranslatePipe,
    private categoryService: CashFlowCategoryService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
  ) {
    this.categoryDetailsForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required], [CategoryValidators.checkExisting(this.categoryService, this)]),
      gain: new FormControl(false, []),
      expense: new FormControl(false, []),
    });
  }

  ngOnInit(): void {
    this.searchCategories();
  }

  hideCategoryDetailsDialog(): void {
    this.categoryDetailsDialog = false;
  }

  showCategoryDetailsDialog(): void {
    this.categoryDetailsDialog = true;
  }

  hideDeleteCategoryDialog(): void {
    this.deleteCategoryDialog = false;
  }

  showDeleteCategoryDialog(): void {
    this.deleteCategoryDialog = true;
  }

  addCategory(): void {
    this.currentCategoryName = '';
    this.currentCategoryUuid = '';
    this.categoryDetailsForm.reset();
    this.categoryDetailsDialogHeader = 'ADD_CATEGORY';
    this.mode = 'ADD';
    this.showCategoryDetailsDialog();
  }

  editCategory(category: any): void {
    this.currentCategoryUuid = category.uuid;
    this.currentCategoryName = category.name;
    this.categoryDetailsForm.get('name')?.setValue(category.name);
    this.categoryDetailsForm.get('gain')?.setValue(category.gain);
    this.categoryDetailsForm.get('expense')?.setValue(category.expense);
    this.categoryDetailsDialogHeader = 'EDIT_CATEGORY';
    this.mode = 'EDIT';
    this.showCategoryDetailsDialog();
  }

  deleteCategory(category: any): void {
    this.currentCategoryName = category.name;
    this.currentCategoryUuid = category.uuid;
    this.showDeleteCategoryDialog();
  }

  saveCategory(event: Event): void {
    event.stopPropagation();
    if (this.mode === 'ADD') {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }

  get categoryDetailsControls() {
    return this.categoryDetailsForm.controls;
  }

  searchCategories(): void {
    this.categoryService.searchCategories().pipe(
      tap({
        next: response => {
          this.cashFlowCategoryList = response;
        },
        error: error => {
          console.log(error);
        }
      })
    ).subscribe();
  }

  createCategory(): void {
    if (this.categoryDetailsForm.invalid) {
      return;
    }
    this.saveIsLoading = true;
    const category: CashFlowCategory = {
      name: this.categoryDetailsForm.value.name,
      gain: this.categoryDetailsForm.value.gain,
      expense: this.categoryDetailsForm.value.expense,
      systemCategory: true,
      status: CashFlowCategoryStatus.VALIDATED
    }
    this.categoryService.createCategory(category).pipe(
      tap({
        next: response => {
          this.hideCategoryDetailsDialog();
          this.notificationService.notifySuccess('CATEGORY_CREATION_SUCCESS');
          this.searchCategories();
          this.saveIsLoading = false;
        },
        error: error => {
          console.log(error);
          this.notificationService.notifyError('CATEGORY_CREATION_ERROR');
          this.saveIsLoading = false;
        }
      })
    ).subscribe();
  }

  updateCategory(): void {
    if (this.categoryDetailsForm.invalid) {
      return;
    }
    this.saveIsLoading = true;
    const category: CashFlowCategory = {
      name: this.categoryDetailsForm.value.name,
      gain: this.categoryDetailsForm.value.gain,
      expense: this.categoryDetailsForm.value.expense,
    }
    this.categoryService.updateCategory(this.currentCategoryUuid, category).pipe(
      tap({
        next: response => {
          this.hideCategoryDetailsDialog();
          this.notificationService.notifySuccess('UPDATE_SUCCESS');
          this.searchCategories();
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

  confirmDeleteCategory(event: Event): void {
    event.stopPropagation();
    this.deleteIsLoading = true;
    this.categoryService.deleteCategory(this.currentCategoryUuid).pipe(
      tap({
        next: response => {
          this.hideDeleteCategoryDialog();
          this.searchCategories();
          this.notificationService.notifySuccess('DELETE_CATEGORY_SUCCESS');
          this.deleteIsLoading = false;
        },
        error: error => {
          console.log(error);
          this.deleteIsLoading = false;
          this.notificationService.notifyError('DELETE_CATEGORY_ERROR');
        }
      })
    ).subscribe();
  }

  protected readonly CashFlowCategoryStatus = CashFlowCategoryStatus;
}
