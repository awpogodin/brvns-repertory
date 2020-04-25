import { Component, OnInit, ViewChild } from "@angular/core";
import { RestApiService } from "../../services/rest-api.service";
import { SymptomDTO } from "../../../../../../common/dto/symptom.dto";
import codes from "../../../../../../common/response-codes";
import { NotificationService } from "../../services/notification.service";
import { MedicationDTO } from "../../../../../../common/dto/medication.dto";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "./dialog/dialog.component";
import { SymptomToMedicationBodyDTO } from "../../../../../../common/dto/symptom-to-medication-body.dto";

@Component({
    selector: "brvns-repertory-repertory",
    templateUrl: "./repertory.component.html",
    styleUrls: ["./repertory.component.scss"],
})
export class RepertoryComponent implements OnInit {
    loading = true;
    inputCategory = [];
    listOfCategories = [];
    inputSymptom = [];
    listOfSymptoms = [];

    medications: MatTableDataSource<MedicationDTO> = new MatTableDataSource<
        MedicationDTO
    >([]);

    displayedColumns: string[] = ["name", "description"];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private restApiService: RestApiService,
        private notificationService: NotificationService,
        public dialog: MatDialog
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

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: "300px",
        });

        dialogRef.afterClosed().subscribe((name) => {
            if (name) {
                const symptomsIds = this.inputSymptom.map((s) => s.symptom_id);
                const body: SymptomToMedicationBodyDTO = {
                    medication_name: name,
                    symptoms: symptomsIds,
                };
                this.loading = true;
                this.restApiService.addMedicationToSymptom(body).subscribe(
                    () => {
                        this.loading = false;
                        this.notificationService.notification$.next(
                            "Связка добавлена"
                        );
                        this.updateMedications();
                    },
                    (err) => {
                        const msg = codes[err] || "Что-то пошло не так";
                        this.notificationService.notification$.next(msg);
                        this.loading = false;
                        this.updateMedications();
                    }
                );
            }
        });
    }

    private fetchParentSymptoms(): void {
        this.loading = true;
        const categories = this.inputCategory
            .map((c) => c.category_id)
            .join(",");
        this.restApiService
            .getParentSymptomsByCategories(categories, true)
            .subscribe(
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

    onAddCategory(): void {
        this.fetchParentSymptoms();
    }

    onRemoveCategory(): void {
        this.inputSymptom.splice(0, this.inputSymptom.length);
        this.listOfSymptoms.splice(0, this.listOfSymptoms.length);
        this.medications = new MatTableDataSource<MedicationDTO>([]);
        if (this.inputCategory.length) {
            this.fetchParentSymptoms();
        }
    }

    onAddSymptom(symptom: SymptomDTO): void {
        this.loading = true;
        this.restApiService
            .getChildSymptomsByParentId(symptom.symptom_id, true)
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

    onRemoveSymptom(symptom: SymptomDTO): void {
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

    updateMedications(): void {
        this.loading = true;
        const body = this.inputSymptom;
        this.restApiService.getMedicationsBySymptoms(body).subscribe((res) => {
            this.medications = new MatTableDataSource<MedicationDTO>(res);
            this.loading = false;
        });
    }
}
