import {Component, OnInit} from '@angular/core';
import {Utilities} from '../../../utilities/utilities';
import {QuotationRequest} from '../../../models/quotation-request';
import {QuotationRequestDetail} from '../../../models/quotation-request-detail';
import {Routes} from '../../../enums/routes.enum';
import {ProductServiceDetail} from '../../../models/product-service-detail';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public hasQuotes = false;
  public quotation: QuotationRequest;
  public quotationElements = new Array();
  public quotes = new Array();
  public routes = Routes;
  public totalQuotation = new Array();

  constructor(protected utilities: Utilities) {
  }

  ngOnInit(): void {
    const currentElements = this.utilities.getFromSession('quotation');

    this.utilities.observeSessionChanges('quotation')
      .subscribe((elements) => {
        this.getQuoteElements(elements);
      });

    if (currentElements) {
      this.getQuoteElements(currentElements);
    }
  }

  protected getQuoteElements(elements) {
    this.quotationElements = new Array();
    this.quotationElements = this.utilities.decodeJsonElement(elements, new Array());
    this.quotationElements.forEach((quote) => {
      const quotationRequest = Object.assign(new QuotationRequest(), quote);
      Object.values(quotationRequest.details).forEach((detail) => {
        const newDetail = Object.assign(new QuotationRequestDetail(), detail);
        if (this.canAddNewDetail(newDetail)) {
          this.quotes.push(newDetail);
        }
      });
      this.hasQuotes = this.quotes.length > 0;
    });
  }

  protected canAddNewDetail(newDetail): boolean {
    const searchResult = this.quotes.find((currentDetail) => {
      const additionalInformation = currentDetail.additionalInformation === newDetail.additionalInformation;
      const productDescription = currentDetail.productDescription === newDetail.productDescription;
      return additionalInformation && productDescription;
    });
    return typeof searchResult === 'undefined';
  }

  protected getTotalQuotation() {
    const storedSession = this.utilities.getFromSessionObject('quotation', new Array());
    this.totalQuotation = new Array();
    storedSession.forEach((quotation) => {
      const quotationRequest: QuotationRequest = Object.assign(new QuotationRequest(), quotation);
      quotationRequest.assingObjectToDetail(quotationRequest.details);
      this.totalQuotation.push(quotationRequest);
    });
    this.hasQuotes = this.totalQuotation.length > 0;
  }
}
