import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpRequestService} from '../http-request/http-request.service';
import {QuotationRequest} from '../../models/quotation-request';
import {HttpMethod} from '../../enums/http-method.enum';
import {QuotationRequestFilter} from '../../models/quotation-request-filter';
import {QuotationRequestFtype} from '../../enums/quotation-request-ftype.enum';
import {Quotation} from '../../models/quotation';
import {QuotationResponse} from '../../models/quotation-response';

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

  public createQuotation(quotation: Quotation): Observable<QuotationResponse> {
    const details = [];
    quotation.details.forEach((detail) => {
      details.push({
        productId: detail.productId,
        productDescription: detail.productDescription,
        quantity: detail.quantity,
        additionalInformation: detail.additionalInformation,
        amount: detail.amount,
        description: detail.description
      });
    });

    const payload = {
      requestId: quotation.requestId,
      providerId: quotation.providerId,
      amountTotal: quotation.amountTotal,
      details
    };

    return this.httpRequest.request('/quotation', payload, HttpMethod.POST);
  }


  public getQuotationRequest(quotationFilter: QuotationRequestFilter,
                             filterType: string = QuotationRequestFtype.PERSON): Observable<Array<QuotationRequest>> {
    return this.httpRequest.request(`/request-quotation/${filterType}`, quotationFilter, HttpMethod.POST);
  }

  public getProviderQuotationRequest(quotationFilter: QuotationRequestFilter,
                                     filterType: string = QuotationRequestFtype.PROVIDER): Observable<Array<QuotationRequest>> {
    return this.httpRequest.request(`/request-quotation/${filterType}`, quotationFilter, HttpMethod.POST);
  }
}
