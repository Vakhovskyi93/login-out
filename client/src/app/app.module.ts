import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AuthServise } from "./services/auth.servise";
import { TokenInterceptor} from "../shares/token.interceptor";
import {FlashMessagesModule} from "angular2-flash-messages";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    UsersListComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FlashMessagesModule.forRoot()
    ],
  providers: [
    AuthServise,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
