import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainModule} from "./main-module/main.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthenticationModule} from "./authentication-module/authentication.module";
import {HttpClientModule} from "@angular/common/http";
import {AppHttpClient} from "./shared/http/app-http-client";
import {NotificationService} from "./shared/services/notification.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MainModule,
    AuthenticationModule,
  ],
  providers: [AppHttpClient, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
