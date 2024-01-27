import {Component, OnInit} from '@angular/core';
import {CashFlowCategory} from "./types/cash-flow-category";
import {Router} from "@angular/router";
import {TranslatePipe} from "../../../../../shared/pipes/translate.pipe";
import {RoleService} from "../../../role/services/role.service";
import {NotificationService} from "../../../../services/notification.service";
import {FormBuilder} from "@angular/forms";
import {CashFlowCategoryService} from "./services/cash-flow-category.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-cash-flow-category',
  templateUrl: './cash-flow-category.component.html',
  styleUrls: ['./cash-flow-category.component.css'],
  providers: [TranslatePipe, NotificationService, CashFlowCategoryService]
})
export class CashFlowCategoryComponent implements OnInit {

  cashFlowCategoryList: CashFlowCategory[] = [];

  constructor(
    private router: Router,
    private translate: TranslatePipe,
    private categoryService: CashFlowCategoryService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.searchCategories();
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
}
