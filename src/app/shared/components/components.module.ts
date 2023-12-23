import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {SideBarComponent} from "./side-bar/side-bar.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenubarModule } from 'primeng/menubar';
import {CardModule} from "primeng/card";
import { AboutComponent } from './about/about.component';
import { DialogModule } from 'primeng/dialog';
import {PipesModule} from "../pipes/pipes.module";
import { SaveBtnComponent } from './save-btn/save-btn.component';
import { CancelBtnComponent } from './cancel-btn/cancel-btn.component';
import {ButtonModule} from "primeng/button";
import { FooterComponent } from './footer/footer.component';
import { SaveCancelFooterComponent } from './save-cancel-footer/save-cancel-footer.component';
import { ConfirmBtnComponent } from './confirm-btn/confirm-btn.component';
import { ConfirmCancelFooterComponent } from './confirm-cancel-footer/confirm-cancel-footer.component';
import { LoaderComponent } from './loader/loader.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {TabViewModule} from "primeng/tabview";

@NgModule({
  declarations: [
    NavBarComponent,
    SideBarComponent,
    NotFoundComponent,
    AboutComponent,
    SaveBtnComponent,
    CancelBtnComponent,
    FooterComponent,
    SaveCancelFooterComponent,
    ConfirmBtnComponent,
    ConfirmCancelFooterComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    PanelMenuModule,
    MenubarModule,
    CardModule,
    DialogModule,
    PipesModule,
    ButtonModule,
    ProgressSpinnerModule,
    TabViewModule,
  ],
  exports: [
    NavBarComponent,
    SideBarComponent,
    NotFoundComponent,
    CancelBtnComponent,
    SaveBtnComponent,
    FooterComponent,
    SaveCancelFooterComponent,
    ConfirmCancelFooterComponent,
    LoaderComponent,
  ]
})
export class ComponentsModule { }
