import {Component, OnInit} from '@angular/core';
import {CartComponent} from '../../components/quotation/cart/cart.component';
import {NgForm} from '@angular/forms';
import {Session} from '../../models/session';
import {ProductCategories} from '../../enums/product-categories.enum';
import {QuotationRequest} from '../../models/quotation-request';
import {QuotationService} from '../../provider/quotation/quotation.service';
import {Utilities} from '../../utilities/utilities';
import {Router} from '@angular/router';
import {Routes} from '../../enums/routes.enum';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent extends CartComponent implements OnInit {

  public showQuoteDetail = false;
  public session: Session;
  public categoryEnum = ProductCategories;
  public requestedQuotations: QuotationRequest[] = [];
  public staticAlertClosed = true;

  constructor(protected utilities: Utilities, private quotationService: QuotationService, private router: Router) {
    super(utilities);
  }

  ngOnInit(): void {
    this.checkForSession();
    this.getTemporalQuotations();
    this.getQuotationRequest();
  }

  onQuoteClick(categoryOrQuote: number | QuotationRequest) {
    this.showQuoteDetail = true;
    this.skipStorage = false;
    if (typeof categoryOrQuote === 'number') {
      this.quotation = this.findQuote(categoryOrQuote);
    } else {
      this.quotation = categoryOrQuote;
      this.skipStorage = true;
    }
    return false;
  }

  private checkForSession() {
    this.session = this.utilities.getFromSessionObject('session', this.session);
  }

  getQuotationRequest() {
    const payload = {personId: this.session.person.personId};
    this.quotationService.getQuotationRequest(payload).subscribe((requestedQuotations) => {
      this.requestedQuotations = requestedQuotations;
    });
  }

  onSubmit(requestQuoteForm: NgForm) {
    this.quotation.additionalInfo = requestQuoteForm.value.additionalInfo;
    this.quotation.personId = this.session.person.personId;
    this.quotationService.createQuotationRequest(this.quotation).subscribe((requestResult) => {
      this.utilities.removeOnSession('quotation');
      this.staticAlertClosed = false;
      setTimeout(() => {
        this.staticAlertClosed = true;
        window.location.href = Routes.QUOTES;
      }, 2000);
    });
    return false;
  }

  findQuote(categoryId): QuotationRequest {
    let quotationRequestResult: QuotationRequest = new QuotationRequest();
    this.temporalQuotations.forEach((quotationRequest: QuotationRequest) => {
      if (quotationRequest.categoryId === categoryId) {
        quotationRequestResult = quotationRequest;
      }
    });
    return quotationRequestResult;
  }
}
