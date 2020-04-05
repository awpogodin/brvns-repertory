import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TagInputModule } from "ngx-chips";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule, Routes } from "@angular/router";
import { RepertoryComponent } from "./components/repertory/repertory.component";
import { MatMenuModule } from "@angular/material/menu";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { HeadingComponent } from "./components/heading/heading.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { AuthGuard } from "./guards/auth.guard";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ProfileComponent } from "./components/profile/profile.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MedicationsComponent } from "./components/medications/medications.component";
import {MatPaginatorModule} from "@angular/material/paginator";

const routes: Routes = [
    {
        path: "",
        component: RepertoryComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "medications",
        component: MedicationsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "login",
        component: LoginFormComponent,
    },
    {
        path: "register",
        component: RegisterFormComponent,
    },
    {
        path: "**",
        redirectTo: "/",
    },
];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        RepertoryComponent,
        LoginFormComponent,
        HeadingComponent,
        RegisterFormComponent,
        ProfileComponent,
        MedicationsComponent,
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        TagInputModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
