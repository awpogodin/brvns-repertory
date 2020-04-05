import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserDTO } from "../../../../../common/dto/user.dto";
import { first } from "rxjs/operators";
import { CategoryDTO } from "../../../../../common/dto/category.dto";
import { SymptomDTO } from "../../../../../common/dto/symptom.dto";
import { MedicationDTO } from "../../../../../common/dto/medication.dto";
import { MedicationBodyDTO } from "../../../../../common/dto/medication-body.dto";

const API = "/api";

@Injectable({
    providedIn: "root",
})
export class RestApiService {
    // Http Options
    private httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
        }),
    };

    constructor(private httpClient: HttpClient) {}

    getCurrentUser(): Observable<UserDTO> {
        return this.httpClient.get<UserDTO>(`${API}/auth`).pipe(first());
    }

    getAllCategories(): Observable<CategoryDTO[]> {
        return this.httpClient
            .get<CategoryDTO[]>(`${API}/repertory/categories`)
            .pipe(first());
    }

    getParentSymptomsByCategories(
        categories: string
    ): Observable<SymptomDTO[]> {
        return this.httpClient
            .get<SymptomDTO[]>(
                `${API}/repertory/symptoms?category_id=${categories}`
            )
            .pipe(first());
    }

    getChildSymptomsByParentId(id: number): Observable<SymptomDTO[]> {
        return this.httpClient
            .get<SymptomDTO[]>(`${API}/repertory/symptoms?parent_id=${id}`)
            .pipe(first());
    }

    getMedicationsBySymptoms(symptoms: number[]): Observable<MedicationDTO[]> {
        return this.httpClient
            .post<MedicationDTO[]>(
                `${API}/repertory/medications-by-symptoms`,
                symptoms
            )
            .pipe(first());
    }

    getAllMedications(): Observable<MedicationDTO[]> {
        return this.httpClient
            .get<MedicationDTO[]>(`${API}/repertory/medications`)
            .pipe(first());
    }

    createMedication(body: MedicationBodyDTO): Observable<any> {
        return this.httpClient
            .post(`${API}/repertory/medications`, body)
            .pipe(first());
    }
}
