import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from "@angular/forms";
import { RestApiService } from "../../../services/rest-api.service";
import { MedicationDTO } from "common/dto/medication.dto";
import codes from "../../../../../../../common/response-codes";
import { NotificationService } from "../../../services/notification.service";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";

@Component({
    selector: "brvns-repertory-dialog",
    templateUrl: "./dialog.component.html",
    styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private restApiService: RestApiService,
        private notificationService: NotificationService,
        public dialogRef: MatDialogRef<DialogComponent>
    ) {}

    public isLoading = true;

    public medications: string[] = [];
    public filteredMedications: Observable<string[]>;

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

    ngOnInit(): void {
        this.restApiService.getAllMedications().subscribe(
            (res) => {
                this.medications = res.map((m) => m.name);
                this.isLoading = false;
                this.filteredMedications = this.name.valueChanges.pipe(
                    startWith(""),
                    map((v) => this._filter(v))
                );
            },
            (err) => {
                const msg = codes[err] || "Что-то пошло не так";
                this.notificationService.notification$.next(msg);
                this.isLoading = false;
            }
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.medications.filter((m) =>
            m.toLowerCase().includes(filterValue)
        );
    }
}
