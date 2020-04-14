import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpMethod} from '../../enums/http-method.enum';
import {HttpRequestService} from '../http-request/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class ProvideradmService {

  constructor(private httpRequest: HttpRequestService) { }

  public providerAdmRegistry(registerForm): Observable<any> {
    const payload = {
      subCategoryId: registerForm.value.subCategoryType,
      productServiceDescription: registerForm.value.productDescription,
    };
    
    return this.httpRequest.request('/product-service', payload, HttpMethod.POST);
  }
}
