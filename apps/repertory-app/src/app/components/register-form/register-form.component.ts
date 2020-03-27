import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    FormGroupDirective, NgForm,
    ValidationErrors,
    Validators
} from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.touched && (form.hasError('mismatch') || control.invalid);
    }
}

@Component({
  selector: 'brvns-repertory-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
    constructor(
        private formBuilder: FormBuilder,
    ) {}

    public form: FormGroup = this.formBuilder.group({
        name: ['', Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
        ])],
        surname: ['', Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
        ])],
        email: ['', Validators.compose([
            Validators.required,
            Validators.email,
        ])],
        password: ['', Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
        ])],
        confirmPassword: ['', { validators: Validators.required, }],
    }, { validators: this.validatePasswords });

    public loading = false;
    public errorMatcher = new CrossFieldErrorMatcher();

    get name(): AbstractControl { return this.form.get('name'); }
    get surname(): AbstractControl { return this.form.get('surname'); }
    get email(): AbstractControl { return this.form.get('email'); }
    get password(): AbstractControl { return this.form.get('password'); }
    get confirmPassword(): AbstractControl { return this.form.get('confirmPassword'); }

    getNameErrorMessage() {
        const errors = [];
        if (this.name.errors.required) {
            errors.push('Введите имя');
        }
        if (this.name.errors.minlength) {
            errors.push('Имя должно быть не менее 3 символов');
        }
        if (this.name.errors.maxlength) {
            errors.push('Имя должно быть не более 20 символов');
        }
        return errors;
    }

    getSurnameErrorMessage() {
        const errors = [];
        if (this.surname.errors.required) {
            errors.push('Введите фамилия');
        }
        if (this.surname.errors.minlength) {
            errors.push('Фамилия должна быть не менее 3 символов');
        }
        if (this.surname.errors.maxlength) {
            errors.push('Фамилия должна быть не более 20 символов');
        }
        return errors;
    }

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

    getConfirmPasswordErrorMessage() {
        const errors = [];
        if (this.confirmPassword.errors?.required) {
            errors.push('Введите пароль');
        }
        if (this.form.hasError('mismatch')) {
            errors.push('Пароли не совпадают');
        }
        return errors;
    }

    validatePasswords(group: FormGroup): ValidationErrors | null {
        const password = group.get('password').value;
        const confirmPassword = group.get('confirmPassword').value;
        if (password === confirmPassword) {
            return null
        }
        return { 'mismatch': true };
    }

    onSubmit() {
        if (this.form.valid) {
            const body = this.form.getRawValue();
            console.log(body);
        }
    }
}
