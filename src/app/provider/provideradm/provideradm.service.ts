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
      categoryId: registerForm.value.tipoCategoria,
      businessName: registerForm.value.razonSocial,
      address: registerForm.value.direccion,
      endPoint: registerForm.value.endPoint,
      generalInformation: registerForm.value.info,
      identificationType: registerForm.value.tipoDocumento,
      identificationNumber: registerForm.value.numeroDocumento,
      email: registerForm.value.email,
      phoneNumber: registerForm.value.telefono

    };
    
    return this.httpRequest.request('/advisor', payload, HttpMethod.POST);
  }
}
