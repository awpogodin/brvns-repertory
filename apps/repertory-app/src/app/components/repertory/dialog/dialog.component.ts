import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from "@angular/forms";

@Component({
    selector: "brvns-repertory-dialog",
    templateUrl: "./dialog.component.html",
    styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent {
    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DialogComponent>
    ) {}

    public form: FormGroup = this.formBuilder.group({
        name: [
            "",
            Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(15),
            ]),
        ],
    });

    get name(): AbstractControl {
        return this.form.get("name");
    }

    getNameErrorMessage(): string[] {
        const errors = [];
        if (this.name.errors.required) {
            errors.push("Введите название препарата");
        }
        if (this.name.errors.minlength) {
            errors.push("Длина должна быть не менее 2 символов");
        }
        if (this.name.errors.maxlength) {
            errors.push("Длина должна быть не более 15 символов");
        }
        return errors;
    }

    onSubmit(): void {
        if (this.form.valid) {
            const body = this.form.getRawValue();
            this.dialogRef.close(body.name);
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
