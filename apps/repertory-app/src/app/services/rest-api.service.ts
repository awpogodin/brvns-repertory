import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserDTO } from "../../../../../common/dto/user.dto";
import { first } from "rxjs/operators";
import { CategoryDTO } from "../../../../../common/dto/category.dto";

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
}
