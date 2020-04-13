import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpRequestService} from '../http-request/http-request.service';
import {QuotationRequest} from '../../models/quotation-request';
import {HttpMethod} from '../../enums/http-method.enum';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  constructor(private httpRequest: HttpRequestService) {
  }

  public createQuotationRequest(quotation: QuotationRequest): Observable<QuotationRequest> {
    const details = [];
    quotation.details.forEach((detail) => {
      details.push({
        productId: detail.productId,
        productDescription: detail.productDescription,
        quantity: detail.quantity,
        additionalInformation: detail.additionalInformation
      });
    });

    const payload = {
      categoryId: quotation.categoryId,
      personId: quotation.personId,
      additionalInfo: quotation.additionalInfo,
      details
    };

    return this.httpRequest.request('/request-quotation', payload, HttpMethod.POST);
  }
}
