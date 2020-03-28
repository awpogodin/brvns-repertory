import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginRequestDTO } from "../../../../../common/dto/login-request.dto";
import { LoginResponseDTO } from "../../../../../common/dto/login-response.dto";
import { map, catchError } from "rxjs/operators";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import { RegisterRequestDTO } from "../../../../../common/dto/register-request.dto";
import {UserDTO} from "../../../../../common/dto/user.dto";

const API = '/api/auth';
const USER = 'current_user';

export const storage = {
    getUser() {
        return JSON.parse(localStorage.getItem(USER))
    },
    setUser(user) {
        localStorage.setItem(USER, JSON.stringify(user))
    },
    removeUser() {
        localStorage.removeItem(USER);
    }
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<LoginResponseDTO>;
    public currentUser: Observable<LoginResponseDTO>;

    constructor(private httpClient: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<LoginResponseDTO>(storage.getUser());
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): LoginResponseDTO {
        return this.currentUserSubject.value;
    }

    login(body: LoginRequestDTO): Observable<LoginResponseDTO> {
        return this.httpClient.post<LoginResponseDTO>(`${API}/login`, body)
          .pipe(
              // catchError(this.handleError),
              map(user => {
                  console.log('res: ', user);
                  storage.setUser(user);
                  this.currentUserSubject.next(user);
                  return user;
              })
          )
    }

    register(body: RegisterRequestDTO): Observable<any> {
      return this.httpClient.post<any>(`${API}/register`, body)
          .pipe(
              catchError(this.handleError),
              map(() => {
                  const { email, password } = body;
                  this.login({ email, password })
              })
          )
    }

    logout(): void {
        storage.removeUser();
        this.currentUserSubject.next(null);
    }

    // Handle errors
    handleError(error) {
        if (error.error instanceof ErrorEvent) {
            // Throw client-side error
            return throwError(error.error.message);
        } else {
            // Throw server-side error
            return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
        }
    }
}
