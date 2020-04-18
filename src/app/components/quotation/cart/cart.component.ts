import {Component, Input, OnInit} from '@angular/core';
import {Utilities} from '../../../utilities/utilities';
import {QuotationRequest} from '../../../models/quotation-request';
import {QuotationRequestDetail} from '../../../models/quotation-request-detail';
import {Routes} from '../../../enums/routes.enum';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input() quotes = new Array();
  @Input() skipStorage = false;
  public hasTemporalQuotes = false;
  public quotation: QuotationRequest;
  public quotationElements = new Array();
  public routes = Routes;
  public temporalQuotations = new Array();

  constructor(protected utilities: Utilities) {
  }

  ngOnInit(): void {
    if (this.skipStorage) {
      this.hasTemporalQuotes = this.quotes.length > 0;
    } else {
      const currentElements = this.utilities.getFromSession('quotation');
      this.utilities.observeSessionChanges('quotation')
        .subscribe((elements) => {
          this.getQuoteElementsFromStorage(elements);
        });
      if (currentElements) {
        this.getQuoteElementsFromStorage(currentElements);
      }
    }
  }

  protected getQuoteElementsFromStorage(elements) {
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
      this.hasTemporalQuotes = this.quotes.length > 0;
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

  protected getTemporalQuotations() {
    const storedSession = this.utilities.getFromSessionObject('quotation', new Array());
    this.temporalQuotations = new Array();
    storedSession.forEach((quotation) => {
      const quotationRequest: QuotationRequest = Object.assign(new QuotationRequest(), quotation);
      quotationRequest.assingObjectToDetail(quotationRequest.details);
      if (quotationRequest.details.length > 0) {
        this.temporalQuotations.push(quotationRequest);
      }
    });
    this.hasTemporalQuotes = this.temporalQuotations.length > 0;
  }
}
