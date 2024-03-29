import { NgModule } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {CommonModule} from "@angular/common";
import { AuthComponent } from './auth.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {CardModule} from "primeng/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {PipesModule} from "../shared/pipes/pipes.module";
import { PasswordModule } from 'primeng/password';
import {SharedModule} from "../shared/shared.module";
import { RecoveryComponent } from './recovery/recovery.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessagesModule } from 'primeng/messages';
import {MessageModule} from "primeng/message";

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    RecoveryComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PipesModule,
    PasswordModule,
    SharedModule,
    RadioButtonModule,
    FormsModule,
    MessagesModule,
    MessageModule
  ],
  providers: [],
  bootstrap: [LoginComponent]
})
export class AuthModule { }
