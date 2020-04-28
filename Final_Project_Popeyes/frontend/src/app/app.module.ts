import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ListComponent } from './list/list.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { ComboinfoComponent } from './comboinfo/comboinfo.component';
import { NewcomboComponent } from './newcombo/newcombo.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import { LocalStorage } from './local.storage';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ListComponent,
    UserinfoComponent,
    ComboinfoComponent,
    NewcomboComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LocalStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
