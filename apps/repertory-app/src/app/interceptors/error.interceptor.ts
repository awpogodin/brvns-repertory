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
import { NotificationService } from "../services/notification.service";
import codes from "../../../../../common/response-codes";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private notificationService: NotificationService
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    // auto logout if 401 response returned from api
                    this.authService.logout();
                }
                const error = err.error.message || err.statusText;
                return throwError(error);
            })
        );
    }
}
