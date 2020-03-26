import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder, AbstractControl} from "@angular/forms";

@Component({
  selector: 'brvns-repertory-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
    constructor(
        private formBuilder: FormBuilder,
    ) {}

    public form: FormGroup = this.formBuilder.group({
        email: ['', Validators.compose([
            Validators.required,
            Validators.email
        ])],
        password: ['', Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
        ])]
    });

    public loading = false;

    get email(): AbstractControl { return this.form.get('email'); }
    get password(): AbstractControl { return this.form.get('password'); }

    getEmailErrorMessage() {
        const errors = [];
        if (this.email.errors.required) {
            errors.push('Введите email');
        }
        if (this.email.errors.email) {
            errors.push('Введите корректный email');
        }
        return errors;
    }

    getPasswordErrorMessage() {
        const errors = [];
        if (this.password.errors.required) {
            errors.push('Введите пароль');
        }
        if (this.password.errors.minlength) {
            errors.push('Длина пароля должна быть не менее 5 символов');
        }
        if (this.password.errors.maxlength) {
            errors.push('Длина пароля должна быть не более 20 символов');
        }
        return errors;
    }

    onSubmit() {
        if (this.form.valid) {
            const body = this.form.getRawValue();
            console.log(body);
        }
    }
}