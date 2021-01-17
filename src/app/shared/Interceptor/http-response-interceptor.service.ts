import { RegisterOtpComponent } from './../../../components/register-otp/register-otp.component';
import { LoginService } from './../../Auth/APP/login.service';
import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LoginPageComponent } from 'src/app/shared/components/login-page/login-page.component';


@Injectable({
    providedIn: 'root'
})
export class HttpResponseInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private loginService: LoginService,
        private notify: SnotifyService,
        private bottomSheet: MatBottomSheet,
    ) {
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        this.loginService.logout();
                        this.router.navigate(['/home']);
                        this.bottomSheet.open(LoginPageComponent);
                        return of(null);
                    }
                    throw error;
                }),
                catchError((response: HttpErrorResponse) => {
                    if (response.status === 400) {
                        if (response.error.error == "invalid_grant") {
                            this.notify.error(
                                `${response.error.result}`,
                                'خطا',
                            );
                            if (response.error.error_description == "PhoneNumber is not confirmed!") {
                                this.loginService.requestOPT();
                                this.bottomSheet.open(RegisterOtpComponent);
                            }

                        }
                        else {
                            let serverErrors;

                            if (typeof response.error == "string") {
                                serverErrors = JSON.parse(response.error).errors;
                            }
                            else {
                                serverErrors = response.error.errors;
                            }
                            // tslint:disable-next-line: forin
                            for (const errors in serverErrors) {
                                for (const error of serverErrors[errors]) {
                                    this.notify.error(
                                        `${error}`,
                                        'خطا',
                                    );
                                }
                            }
                        }

                        return throwError(response.error);

                    }
                    else if (response.status > 499) {
                        this.notify.error(
                            `با پشتیبانی تماس بگیرید`,
                            'خطای سرور',
                        );
                    }
                })
            );
    }
}
