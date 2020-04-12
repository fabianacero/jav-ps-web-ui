import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, retry, catchError, timeout} from 'rxjs/operators';
import {HttpMethod} from '../../enums/http-method.enum';
import {ServiceResponse} from '../../enums/service-response.enum';

const REQUEST_TIMEOUT = 30000;

@Injectable()
export class HttpRequestService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    observe: 'response'
  };

  constructor(private http: HttpClient) {
  }

  public request(url: string, params?: any, method?, additionalOptions?): Observable<any> {
    let options = {};
    if (!params) {
      params = {};
    }
    const body = JSON.stringify(params);
    let result: Observable<any>;

    if (additionalOptions && additionalOptions.additionalHeaders) {
      let additionalHeaders = {};
      additionalHeaders = additionalOptions.additionalHeaders;
      let headerValue = '';
      let attrName = '';
      let newHeaders = new HttpHeaders();
      this.httpOptions.headers.keys().forEach(headerName => {
        headerValue = this.httpOptions.headers.get(headerName);
        newHeaders = newHeaders.append(`${headerName}`, headerValue);
      });
      Object.keys(additionalHeaders).map((key) => {
        attrName = key.replace(/_/g, '-');
        newHeaders = newHeaders.append(`${attrName}`, additionalHeaders[key]);
      });
      options = {headers: newHeaders};
    } else {
      options = this.httpOptions;
      options = {...options, ...additionalOptions};
    }

    switch (method) {
      case HttpMethod.POST:
        result = this.http.post(url, body, options);
        break;
      case HttpMethod.PUT:
        result = this.http.put(url, body, options);
        break;
      case HttpMethod.GET:
      default:
        result = this.http.get(url + this.listParams(params), options);
        break;
    }

    return result.pipe(
      retry(1),
      timeout(REQUEST_TIMEOUT),
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(response: Response) {
    if (response && response.status > ServiceResponse.ERROR) {
      throwError(`Controlled error ${response.status}`);
    }
    return response.body;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError({message: 'Something bad happened; please try again later.', code: error.status});
  }

  private listParams(data): string {
    if (data === '') {
      return '';
    } else {
      return Object.keys(data).map(key => `?${key}=${encodeURIComponent(data[key])}`).join('&');
    }
  }
};
