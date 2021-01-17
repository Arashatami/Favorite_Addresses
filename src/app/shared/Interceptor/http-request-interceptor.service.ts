import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const contentType = request.headers.get('Content-Type');

    // set Content-Type and Accept header if it is not set before

    if (!contentType) {
      request = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      });
    }

    const accept = request.headers.get('Accept');
    if (!accept) {
      request = request.clone({
        headers: new HttpHeaders({
          'Accept': `application/json`
        })
      });
    }

    return next.handle(request);
  }

}
