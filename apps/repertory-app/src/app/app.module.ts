import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule, Routes} from "@angular/router";
import { RepertoryComponent } from './components/repertory/repertory.component';
import {MatMenuModule} from "@angular/material/menu";
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HeadingComponent } from './components/heading/heading.component';

const routes: Routes = [
    {
        path: '',
        component: RepertoryComponent,
    },
    {
        path: 'login',
        component: LoginFormComponent,
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
  declarations: [AppComponent, NavbarComponent, RepertoryComponent, LoginFormComponent, HeadingComponent],
    imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, FormsModule, MatIconModule, MatButtonModule, RouterModule.forRoot(routes), MatMenuModule,],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
