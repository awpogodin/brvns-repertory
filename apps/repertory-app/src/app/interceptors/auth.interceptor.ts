import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const currentUser = this.authService.currentUserValue;
        if (currentUser && currentUser.accessToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.accessToken}`,
                },
            });
        }
        return next.handle(request);
    }
}
