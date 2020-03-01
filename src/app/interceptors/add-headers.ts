import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReApiService } from '../re-api.service';

@Injectable({
    providedIn: 'root'
})
export class AddHeadersInterceptor implements HttpInterceptor {
    constructor(private reApiService: ReApiService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const modified = req.clone({
            setHeaders: {
                page: this.reApiService.currentPage + '',
                sortOptions: JSON.stringify(this.reApiService.sortOptions)
            }
        });
        return next.handle(modified);
    }
}
