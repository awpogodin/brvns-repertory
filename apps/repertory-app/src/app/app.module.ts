import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
    imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, MatSidenavModule, MatCheckboxModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
