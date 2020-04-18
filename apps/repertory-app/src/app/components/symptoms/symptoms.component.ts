import { Component, OnInit } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from "@angular/forms";
import { RestApiService } from "../../services/rest-api.service";
import { CategoryDTO } from "../../../../../../common/dto/category.dto";
import codes from "../../../../../../common/response-codes";
import { NotificationService } from "../../services/notification.service";
import { SymptomDTO } from "../../../../../../common/dto/symptom.dto";

@Component({
    selector: "brvns-repertory-symptoms",
    templateUrl: "./symptoms.component.html",
    styleUrls: ["./symptoms.component.scss"],
})
export class SymptomsComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private restApiService: RestApiService,
        private notificationService: NotificationService
    ) {}

    public isLoading = true;
    public isFetching = false;

    public categories: CategoryDTO[];
    public category: CategoryDTO;

    public parentSymptoms: SymptomDTO[] = [];
    public symptoms: SymptomDTO[] = [];

    public form: FormGroup = this.formBuilder.group({
        name: [
            "",
            Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(25),
            ]),
        ],
    });

    get name(): AbstractControl {
        return this.form.get("name");
    }

    getNameErrorMessage(): string[] {
        const errors = [];
        if (this.name.errors.required) {
            errors.push("Заполните поле");
        }
        if (this.name.errors.minlength) {
            errors.push("Длина должна быть не менее 2 символов");
        }
        if (this.name.errors.maxlength) {
            errors.push("Длина должна быть не более 25 символов");
        }
        return errors;
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.isFetching = true;
            const body = this.form.getRawValue();
            const parent_id = this.parentSymptoms[
                this.parentSymptoms.length - 1
            ]?.symptom_id;

            this.restApiService
                .createSymptom({
                    ...body,
                    parent_id,
                    category_id: this.category.category_id,
                })
                .subscribe(
                    () => {
                        this.form.reset();
                        this.fetchSymptoms();
                    },
                    (err) => {
                        const msg = codes[err] || "Что-то пошло не так";
                        this.notificationService.notification$.next(msg);
                        this.isFetching = false;
                    }
                );
        }
    }

    onSelect(category: CategoryDTO): void {
        this.parentSymptoms = [];
        this.symptoms = [];
        this.category = category;
        this.fetchSymptoms();
    }

    onExpandSymptom(symptom: SymptomDTO): void {
        this.parentSymptoms.push(symptom);
        this.fetchSymptoms();
    }

    onBack(): void {
        this.parentSymptoms.pop();
        this.fetchSymptoms();
    }

    fetchSymptoms(): void {
        this.isFetching = true;
        if (this.parentSymptoms.length !== 0) {
            const parent = this.parentSymptoms[this.parentSymptoms.length - 1];
            this.restApiService
                .getChildSymptomsByParentId(parent.symptom_id)
                .subscribe(
                    (res) => {
                        this.symptoms = res;
                        this.isFetching = false;
                    },
                    (err) => {
                        const msg = codes[err] || "Что-то пошло не так";
                        this.notificationService.notification$.next(msg);
                        this.isFetching = false;
                    }
                );
        } else {
            this.restApiService
                .getParentSymptomsByCategories(`${this.category.category_id}`)
                .subscribe(
                    (res) => {
                        this.symptoms = res;
                        this.isFetching = false;
                    },
                    (err) => {
                        const msg = codes[err] || "Что-то пошло не так";
                        this.notificationService.notification$.next(msg);
                        this.isFetching = false;
                    }
                );
        }
    }

    ngOnInit(): void {
        this.restApiService.getAllCategories().subscribe(
            (res) => {
                this.categories = res;
                this.isLoading = false;
            },
            (err) => {
                const msg = codes[err] || "Что-то пошло не так";
                this.notificationService.notification$.next(msg);
                this.isLoading = false;
            }
        );
    }
}
