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

  constructor(protected utilities: Utilities, private quotationService: QuotationService, private router: Router) {
    super(utilities);
  }

  ngOnInit(): void {
    this.checkForSession();
    this.getTotalQuotation();
  }

  onQuoteClick(categoryId) {
    this.showQuoteDetail = true;
    this.findQuote(categoryId);
    return false;
  }

  private checkForSession() {
    this.session = this.utilities.getFromSessionObject('session', this.session);
  }

  onSubmit(requestQuoteForm: NgForm) {
    this.quotation.additionalInfo = requestQuoteForm.value.additionalInfo;
    this.quotation.personId = this.session.userId;
    this.quotationService.createQuotationRequest(this.quotation).subscribe((requestResult) => {
      this.utilities.removeOnSession('quotation');
      alert('Cotización registrada exitosamente'); // To Remove!
      this.router.navigate([Routes.QUOTES]);
    });
    return false;
  }

  findQuote(categoryId) {
    this.totalQuotation.forEach((quotationRequest: QuotationRequest) => {
      if (quotationRequest.categoryId === categoryId) {
        this.quotation = quotationRequest;
      }
    });
  }
}
