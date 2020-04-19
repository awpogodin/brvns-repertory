/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit, ViewChild } from "@angular/core";
import { RestApiService } from "../../services/rest-api.service";
import { MedicationDTO } from "../../../../../../common/dto/medication.dto";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from "@angular/forms";
import { NotificationService } from "../../services/notification.service";
import codes from "../../../../../../common/response-codes";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: "brvns-repertory-medications",
    templateUrl: "./medications.component.html",
    styleUrls: ["./medications.component.scss"],
})
export class MedicationsComponent implements OnInit {
    constructor(
        private restApiService: RestApiService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService
    ) {}

    get name(): AbstractControl {
        return this.form.get("name");
    }
    get description(): AbstractControl {
        return this.form.get("description");
    }
    public loading = false;
    public loadingMedications = true;

    public medications: MatTableDataSource<
        MedicationDTO
    > = new MatTableDataSource<MedicationDTO>([]);

    public displayedColumns: string[] = ["name", "description", "actions"];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    public form: FormGroup = this.formBuilder.group({
        name: [
            "",
            Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(15),
            ]),
        ],
        description: [
            "",
            Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50),
            ]),
        ],
    });

    ngOnInit(): void {
        this.medications.paginator = this.paginator;
        this.fetchMedications();
    }

    getNameErrorMessage(): string[] {
        const errors = [];
        if (this.name.errors.required) {
            errors.push("Введите название");
        }
        if (this.name.errors.minlength) {
            errors.push("Длина должна быть не менее 2 символов");
        }
        if (this.name.errors.maxlength) {
            errors.push("Длина должна быть не более 15 символов");
        }
        return errors;
    }

    getDescriptionErrorMessage(): string[] {
        const errors = [];
        if (this.description.errors.required) {
            errors.push("Введите описание");
        }
        if (this.description.errors.minlength) {
            errors.push("Длина должна быть не менее 2 символов");
        }
        if (this.description.errors.maxlength) {
            errors.push("Длина должна быть не более 50 символов");
        }
        return errors;
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.loading = true;
            const body = this.form.getRawValue();
            this.restApiService.createMedication(body).subscribe(
                () => {
                    this.notificationService.notification$.next(
                        "Препарат добавлен"
                    );
                    this.loading = false;
                    this.fetchMedications();
                },
                (err) => {
                    const msg = codes[err] || "Что-то пошло не так";
                    this.notificationService.notification$.next(msg);
                    this.loading = false;
                }
            );
        }
    }

    private fetchMedications(): void {
        this.loadingMedications = true;
        this.restApiService.getAllMedications().subscribe(
            (res) => {
                this.medications = new MatTableDataSource<MedicationDTO>(res);
                this.medications.paginator = this.paginator;
                this.loadingMedications = false;
            },
            (err) => {
                const msg = codes[err] || "Что-то пошло не так";
                this.notificationService.notification$.next(msg);
                this.loadingMedications = false;
            }
        );
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.medications.filter = filterValue.trim().toLowerCase();
    }

    onRemove(id: number): void {
        this.restApiService.removeMedication(id).subscribe(
            () => {
                this.fetchMedications();
                this.notificationService.notification$.next("Препарат удален");
            },
            (err) => {
                const msg = codes[err] || "Что-то пошло не так";
                this.notificationService.notification$.next(msg);
            }
        );
    }
}
