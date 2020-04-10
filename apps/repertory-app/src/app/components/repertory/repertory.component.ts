import { Component, OnInit, ViewChild } from "@angular/core";
import { RestApiService } from "../../services/rest-api.service";
import { SymptomDTO } from "../../../../../../common/dto/symptom.dto";
import codes from "../../../../../../common/response-codes";
import { NotificationService } from "../../services/notification.service";
import { MedicationDTO } from "../../../../../../common/dto/medication.dto";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

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

    public medications: MatTableDataSource<
        MedicationDTO
    > = new MatTableDataSource<MedicationDTO>([]);

    public displayedColumns: string[] = [
        "medication_id",
        "name",
        "description",
    ];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private restApiService: RestApiService,
        private notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.medications.paginator = this.paginator;
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

    private fetchParentSymptoms(): void {
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

    public onAddCategory(): void {
        this.fetchParentSymptoms();
    }

    public onRemoveCategory(): void {
        this.inputSymptom.splice(0, this.inputSymptom.length);
        this.listOfSymptoms.splice(0, this.listOfSymptoms.length);
        this.medications = new MatTableDataSource<MedicationDTO>([]);
        if (this.inputCategory.length) {
            this.fetchParentSymptoms();
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
                    this.updateMedications();
                },
                (err) => {
                    const msg = codes[err] || "Что-то пошло не так";
                    this.notificationService.notification$.next(msg);
                    this.loading = false;
                }
            );
    }

    private findChildsSymptoms(id: number): SymptomDTO[] {
        return (
            this.listOfSymptoms.filter((s) => s.parent?.symptom_id === id) || []
        );
    }

    private deepFindSymptomChilds(id): SymptomDTO[] {
        const result = [];
        const findChildsOfSymptoms = (symptoms): void => {
            symptoms.forEach((s) => {
                result.push(s);
                const childs = this.findChildsSymptoms(s.symptom_id);
                if (childs) {
                    findChildsOfSymptoms(childs);
                }
            });
        };
        findChildsOfSymptoms(this.findChildsSymptoms(id));
        return result;
    }

    public onRemoveSymptom(symptom: SymptomDTO): void {
        this.loading = true;
        const arrOfSymptomsToDelete = this.deepFindSymptomChilds(
            symptom.symptom_id
        );
        arrOfSymptomsToDelete.forEach((ss) => {
            this.listOfSymptoms = this.listOfSymptoms.filter(
                (s) => s.symptom_id !== ss.symptom_id
            );
            this.inputSymptom = this.inputSymptom.filter(
                (s) => s.symptom_id !== ss.symptom_id
            );
        });
        this.loading = false;
        this.updateMedications();
    }

    public updateMedications(): void {
        this.loading = true;
        const body = this.inputSymptom;
        this.restApiService.getMedicationsBySymptoms(body).subscribe((res) => {
            this.medications = new MatTableDataSource<MedicationDTO>(res);
            this.loading = false;
        });
    }
}
