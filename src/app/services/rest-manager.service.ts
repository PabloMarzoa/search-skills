import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RestManagerService {
    private accessKey = 'Client-ID d0IoCpSrR1SMMiKH0ZReNGy8CjNdTLfGcbJRsXDFDyc'; // Only for test projects

    constructor(
        public http: HttpClient,
    ) {}

    public callGETMethod(url: string, options?: RestOptions): Observable<any> {
        const safeOptions = this.parseOptions(options);
        return this.http
            .get<any>(url, this.createOptions(safeOptions))
            .pipe(catchError(error => this.handleError(error)));
    }

    public callPOSTMethod(url: string, body: any, options?: RestOptions): Observable<any> {
        const safeOptions = this.parseOptions(options);
        return this.http
            .post<any>(url, body, this.createOptions(safeOptions))
            .pipe(catchError(error => this.handleError(error)));
    }

    public callPUTMethod(url: string, body: any, options?: RestOptions): Observable<any> {
        const safeOptions = this.parseOptions(options);
        return this.http
            .put<any>( url, body, this.createOptions(safeOptions))
            .pipe(catchError(error => this.handleError(error)));
    }

    public callDELETEMethod(url: string, options?: RestOptions): Observable<any> {
        const safeOptions = this.parseOptions(options);
        return this.http.delete<any>(url, this.createOptions(safeOptions))
            .pipe(catchError(error => this.handleError(error)));
    }

    public createOptions(options: RestOptions): any {
        let headers = new HttpHeaders({});
        headers = headers.append('Authorization', this.accessKey);
        if (options.headers) {
            Object.keys(options.headers).forEach((header: string) => {
                headers.set(header, options.headers[header]);
            });
        }
        return { headers };
    }

    public handleError(response: Response | any): Observable<any> {
        try {
            const error = JSON.parse(response._body);
            return throwError(error);
        } catch (e) {
            return throwError(response);
        }
    }

    public parseOptions(options: RestOptions): RestOptions {
        const safeOptions: RestOptions = {
            headers: {},
            authenticate: true
        };
        if (!options) { return safeOptions; }
        safeOptions.headers = options.headers ? options.headers : {};
        safeOptions.authenticate = options.authenticate === undefined ? safeOptions.authenticate : options.authenticate;
        return safeOptions;
    }
}

export interface RestOptions {
    headers?: { [header: string]: any };
    authenticate?: boolean;
}

