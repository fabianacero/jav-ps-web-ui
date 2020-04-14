import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpMethod} from '../../enums/http-method.enum';
import {HttpRequestService} from '../http-request/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

  constructor(private httpRequest: HttpRequestService) { }

  public getUsers(): Observable<any>  {
    return this.httpRequest.request('/sub-category','',HttpMethod.GET);
  }

  public getSolicitudesPorCategoria(categoria) {
    const payload = {
      categoryId: categoria
    };
    return this.httpRequest.request('/request-quotation/CATEGORY',payload,HttpMethod.POST);
  }

  public getCotizacionesPorCategoria(categoria) {
    const payload = {
      categoryId: categoria
    };
    return this.httpRequest.request('/quotation/CATEGORY',payload,HttpMethod.POST);
  }




  

}
