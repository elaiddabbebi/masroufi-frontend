import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashFlowListComponent } from './cash-flow-list.component';
import {CashFlowListRoutingModule} from "./cash-flow-list-routing.module";
import { CashFlowCategoryComponent } from './components/cash-flow-category/cash-flow-category.component';
import {SharedModule} from "../../shared/shared.module";
import {TabMenuModule} from "primeng/tabmenu";
import {BadgeModule} from "primeng/badge";
import {TabViewModule} from "primeng/tabview";
import {PasswordModule} from "primeng/password";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {InputTextareaModule} from "primeng/inputtextarea";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import { CheckboxModule } from 'primeng/checkbox';
import {TagModule} from "primeng/tag";
import { ChipModule } from 'primeng/chip';
import {CashFlowComponent} from "./components/cash-flow/cash-flow.component";
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    CashFlowListComponent,
    CashFlowCategoryComponent,
    CashFlowComponent
  ],
  imports: [
    CommonModule,
    CashFlowListRoutingModule,
    SharedModule,
    TabMenuModule,
    BadgeModule,
    TabViewModule,
    PasswordModule,
    ToastModule,
    ButtonModule,
    InputTextareaModule,
    TableModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule,
    CheckboxModule,
    TagModule,
    ChipModule,
    AutoCompleteModule,
  ]
})
export class CashFlowListModule { }
