import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../../services/rest-api.service";
import { SymptomDTO } from "../../../../../../common/dto/symptom.dto";
import codes from "../../../../../../common/response-codes";
import { NotificationService } from "../../services/notification.service";

@Component({
    selector: "brvns-repertory-repertory",
    templateUrl: "./repertory.component.html",
    styleUrls: ["./repertory.component.scss"],
})
export class RepertoryComponent implements OnInit {
    public loading = true;
    public inputCategory = [];
    public listOfCategories = [];
    public inputSymptom = [];
    public listOfSymptoms = [];

    public medications = [];
    constructor(
        private restApiService: RestApiService,
        private notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.restApiService.getAllCategories().subscribe(
            (res) => {
                this.listOfCategories = res;
                this.loading = false;
            },
            (err) => {
                const msg = codes[err] || "Что-то пошло не так";
                this.notificationService.notification$.next(msg);
                this.loading = false;
            }
        );
    }

    public onAddCategory(): void {
        this.loading = true;
        const categories = this.inputCategory
            .map((c) => c.category_id)
            .join(",");
        this.restApiService.getParentSymptomsByCategories(categories).subscribe(
            (res) => {
                this.listOfSymptoms = res;
                this.loading = false;
            },
            (err) => {
                const msg = codes[err] || "Что-то пошло не так";
                this.notificationService.notification$.next(msg);
                this.loading = false;
            }
        );
    }

    public onRemoveCategory(): void {
        if (this.inputSymptom.length) {
            this.inputSymptom.splice(0, this.inputSymptom.length);
            this.listOfSymptoms.splice(0, this.listOfSymptoms.length);
        }
    }

    public onAddSymptom(symptom: SymptomDTO): void {
        this.loading = true;
        this.restApiService
            .getChildSymptomsByParentId(symptom.symptom_id)
            .subscribe(
                (res) => {
                    this.listOfSymptoms.push(...res);
                    this.loading = false;
                },
                (err) => {
                    const msg = codes[err] || "Что-то пошло не так";
                    this.notificationService.notification$.next(msg);
                    this.loading = false;
                }
            );
    }

    public updateMedications(): void {
        this.loading = true;
        const body = this.inputSymptom;
        console.log(body);
        this.restApiService.getMedicationsBySymptoms(body).subscribe((res) => {
            this.medications = res;
            this.loading = false;
        });
    }
}
