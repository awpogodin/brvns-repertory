/* eslint-disable @typescript-eslint/unbound-method */
import { Component } from "@angular/core";
import {
    FormGroup,
    Validators,
    FormBuilder,
    AbstractControl,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../services/notification.service";
import codes from "../../../../../../common/response-codes";

@Component({
    selector: "brvns-repertory-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private notificationService: NotificationService
    ) {
        if (this.authService.currentUserValue) {
            this.router.navigate(["/"]);
        }
    }

    public form: FormGroup = this.formBuilder.group({
        email: [
            "",
            Validators.compose([Validators.required, Validators.email]),
        ],
        password: [
            "",
            Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(20),
            ]),
        ],
    });

    public loading = false;

    get email(): AbstractControl {
        return this.form.get("email");
    }
    get password(): AbstractControl {
        return this.form.get("password");
    }

    getEmailErrorMessage(): string[] {
        const errors = [];
        if (this.email.errors.required) {
            errors.push("Введите email");
        }
        if (this.email.errors.email) {
            errors.push("Введите корректный email");
        }
        return errors;
    }

    getPasswordErrorMessage(): string[] {
        const errors = [];
        if (this.password.errors.required) {
            errors.push("Введите пароль");
        }
        if (this.password.errors.minlength) {
            errors.push("Длина пароля должна быть не менее 5 символов");
        }
        if (this.password.errors.maxlength) {
            errors.push("Длина пароля должна быть не более 20 символов");
        }
        return errors;
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.loading = true;
            const body = this.form.getRawValue();
            this.authService.login(body).subscribe(
                () => {
                    this.notificationService.notification$.next(
                        "Авторизация прошла успешно"
                    );
                    this.loading = false;
                    this.router.navigate(["/"]);
                },
                (err) => {
                    const msg = codes[err] || "Что-то пошло не так";
                    this.notificationService.notification$.next(msg);
                    this.loading = false;
                }
            );
        }
    }
}
