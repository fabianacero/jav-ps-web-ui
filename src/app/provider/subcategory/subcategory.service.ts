import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpMethod} from '../../enums/http-method.enum';
import {HttpRequestService} from '../http-request/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private httpRequest: HttpRequestService) { }

  public subCategoriaRegistry(registerForm): Observable<any> {
    const url = '/sub-category';
   

    const payload = {
      categoryId: registerForm.value.categoryType,
      subCategoryDescription:registerForm.value.categoryDescription,

    };

    
    return this.httpRequest.request(url, payload, HttpMethod.POST);
  }
  
}
