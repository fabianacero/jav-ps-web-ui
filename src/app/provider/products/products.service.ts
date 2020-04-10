import { Injectable } from '@angular/core';

import {HttpRequestService} from '../http-request/http-request.service';
import {Observable} from 'rxjs';
import {ProductServiceResponse} from '../../models/product-service-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpRequest: HttpRequestService) { }

  public getAllProductsAndServices(): Observable<[ProductServiceResponse]> {
    return this.httpRequest.request('/product-service');
  }
}
