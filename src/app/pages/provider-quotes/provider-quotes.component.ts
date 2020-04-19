import {Component, OnInit} from '@angular/core';
import {Session} from '../../models/session';
import {ProductCategories} from '../../enums/product-categories.enum';
import {QuotationRequest} from '../../models/quotation-request';
import {Utilities} from '../../utilities/utilities';
import {QuotationService} from '../../provider/quotation/quotation.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Routes} from '../../enums/routes.enum';
import {CartComponent} from '../../components/quotation/cart/cart.component';
import {Quotation} from '../../models/quotation';
import {QuotationResponse} from '../../models/quotation-response';

@Component({
  selector: 'app-provider-quotes',
  templateUrl: './provider-quotes.component.html',
  styleUrls: ['./provider-quotes.component.scss']
})
export class ProviderQuotesComponent extends CartComponent implements OnInit {

  public quoteCreation: Quotation;
  public showQuoteDetail = false;
  public session: Session;
  public categoryEnum = ProductCategories;
  public requestedQuotations: QuotationRequest[] = [];
  public staticAlertClosed = true;

  constructor(protected utilities: Utilities, private quotationService: QuotationService, private router: Router) {
    super(utilities);
  }

  ngOnInit(): void {
    this.quoteCreation = new Quotation();
    this.checkForSession();
    this.getProviderQuotation();
  }

  onQuoteClick(quote: QuotationRequest) {
    const providerId = this.session.providerId;
    this.showQuoteDetail = true;
    this.skipStorage = true;
    this.quotation = quote;
    this.quoteCreation.providerId = providerId;
    this.quoteCreation.requestId = this.quotation.requestQuotationId;
    this.quoteCreation.details = quote.details;
    return false;
  }

  private checkForSession() {
    this.session = this.utilities.getFromSessionObject('session', this.session);
  }

  getProviderQuotation() {
    const providerId = this.session.providerId;
    const categoryId = this.session.provider.categoryId;
    const payload = {providerId, categoryId};
    this.quotationService.getProviderQuotationRequest(payload).subscribe((requestedQuotations) => {
      this.requestedQuotations = requestedQuotations;
    });
  }

  onSubmit(requestQuoteForm: NgForm) {
    let total = Number(0);
    this.quoteCreation.details.forEach(detail => total += Number(detail.amount));
    this.quoteCreation.amountTotal = total;
    this.quotationService.createQuotation(this.quoteCreation).subscribe((quotaResponse: QuotationResponse) => {
      this.staticAlertClosed = false;
      setTimeout(() => {
        this.staticAlertClosed = true;
        window.location.href = Routes.PRIVIDER_QUOTES;
      }, 2000);
    });
    return false;
  }

}
