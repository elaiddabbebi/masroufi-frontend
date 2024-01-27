import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import {ListRoutingModule} from "./list-routing.module";
import { CashFlowCategoryComponent } from './components/cash-flow-category/cash-flow-category.component';
import { CashFlowComponent } from './components/cash-flow/cash-flow.component';
import {SharedModule} from "../../../shared/shared.module";
import {TabMenuModule} from "primeng/tabmenu";
import {BadgeModule} from "primeng/badge";
import {TabViewModule} from "primeng/tabview";
import {PasswordModule} from "primeng/password";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {InputTextareaModule} from "primeng/inputtextarea";
import {TableModule} from "primeng/table";



@NgModule({
  declarations: [
    ListComponent,
    CashFlowCategoryComponent,
    CashFlowComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    SharedModule,
    TabMenuModule,
    BadgeModule,
    TabViewModule,
    PasswordModule,
    ToastModule,
    ButtonModule,
    InputTextareaModule,
    TableModule,
  ]
})
export class ListModule { }
