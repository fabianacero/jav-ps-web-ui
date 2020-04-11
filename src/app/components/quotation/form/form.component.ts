import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Utilities} from '../../../utilities/utilities';
import {QuotationRequest} from '../../../models/quotation-request';
import {QuotationRequestDetail} from '../../../models/quotation-request-detail';
import {ProductServiceDetail} from '../../../models/product-service-detail';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() productServiceData;
  @Input() category;
  public productServiceDescription: string;
  public productServiceId: number;
  public totalQuotation = [];
  public quotation: QuotationRequest;
  public quotationDetail: QuotationRequestDetail;

  constructor(private utilities: Utilities) {
  }

  ngOnInit(): void {
    this.quotation = new QuotationRequest();
    this.quotationDetail = new QuotationRequestDetail();
    this.totalQuotation = this.utilities.getFromSessionObject('quotation', new Array());
    if (this.utilities.isEmpty(this.totalQuotation)) {
      this.totalQuotation = [];
    }
    this.quotationDetail = new QuotationRequestDetail();
    const productServiceDataDecoded = atob(this.productServiceData);
    if (productServiceDataDecoded) {
      const productServiceData = JSON.parse(productServiceDataDecoded) as ProductServiceDetail;
      this.productServiceDescription = productServiceData.productServiceDescription;
      this.productServiceId = productServiceData.productServiceId;
      this.quotationDetail.productDescription = this.productServiceDescription;
      this.quotationDetail.productId = productServiceData.productServiceId;
      this.quotation.categoryId = this.category;
    }
  }

  public onSubmit(form: NgForm) {
    if (form.valid) {
      const detail = new QuotationRequestDetail({
        productId: this.quotationDetail.productId,
        quantity: this.quotationDetail.quantity,
        productDescription: this.quotationDetail.productDescription,
        additionalInformation: this.quotationDetail.additionalInformation
      });
      this.quotation.addDetail(detail);
      this.totalQuotation[(this.category - 1)] = this.quotation;
      this.utilities.saveOnSession('quotation', this.totalQuotation);
      form.reset();
      // To change!
      alert('Cotizacion adicionada correctamente');
    }
    return false;
  }

}
