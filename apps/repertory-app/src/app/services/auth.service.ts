import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginRequestDTO } from "../../../../../common/dto/login-request.dto";
import { LoginResponseDTO } from "../../../../../common/dto/login-response.dto";
import { map, first, tap } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { RegisterRequestDTO } from "../../../../../common/dto/register-request.dto";
import { UserDTO } from "../../../../../common/dto/user.dto";
import { NotificationService } from "./notification.service";

const API = "/api/auth";
const USER = "current_user";

export const storage = {
    getUser(): LoginResponseDTO {
        return JSON.parse(localStorage.getItem(USER));
    },
    setUser(user: LoginResponseDTO): void {
        localStorage.setItem(USER, JSON.stringify(user));
    },
    removeUser(): void {
        localStorage.removeItem(USER);
    },
};

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<LoginResponseDTO>;
    public currentUser: Observable<LoginResponseDTO>;

    constructor(
        private httpClient: HttpClient,
        private notificationService: NotificationService
    ) {
        this.currentUserSubject = new BehaviorSubject<LoginResponseDTO>(
            storage.getUser()
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): LoginResponseDTO {
        return this.currentUserSubject.value;
    }

    checkAuth(): Observable<UserDTO> {
        return this.httpClient.get<UserDTO>(API).pipe(first());
    }

    login(body: LoginRequestDTO): Observable<LoginResponseDTO> {
        return this.httpClient
            .post<LoginResponseDTO>(`${API}/login`, body)
            .pipe(
                first(),
                map((user) => {
                    storage.setUser(user);
                    this.currentUserSubject.next(user);
                    return user;
                })
            );
    }

    register(body: RegisterRequestDTO): Observable<any> {
        return this.httpClient.post<any>(`${API}/register`, body).pipe(first());
    }

    logout(): void {
        storage.removeUser();
        this.currentUserSubject.next(null);
    }
}
