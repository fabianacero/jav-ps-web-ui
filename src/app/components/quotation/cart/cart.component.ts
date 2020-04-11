import {Component, OnInit} from '@angular/core';
import {Utilities} from '../../../utilities/utilities';
import {QuotationRequest} from '../../../models/quotation-request';
import {QuotationRequestDetail} from '../../../models/quotation-request-detail';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public quotationElements = new Array();
  public quotes = [];

  constructor(private utilities: Utilities) {
  }

  ngOnInit(): void {
    this.quotationElements = this.utilities.getFromSessionObject('quotation', new Array());
    this.quotationElements.forEach((quote) => {
      const quotationRequest = Object.assign(new QuotationRequest(), quote);
      Object.values(quotationRequest.details).forEach((detail) => {
        this.quotes.push(Object.assign(new QuotationRequestDetail(), detail));
      });
    });
  }
}
