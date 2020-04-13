import {Component, OnInit} from '@angular/core';
import {ProductServiceResponse} from '../../models/product-service-response';
import {ProductServiceDetail} from '../../models/product-service-detail';
import {ProductsService} from '../../provider/products/products.service';
import {Utilities} from '../../utilities/utilities';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  public product: ProductServiceDetail;
  public service: ProductServiceDetail;
  public categories = {product: 0, service: 0};
  public productsBySubCategory;
  public servicesBySubCategory;

  constructor(private productsService: ProductsService, private utilities: Utilities) {
  }

  ngOnInit(): void {
  }

  public getAllProductsAndServices() {

    this.productsService.getAllProductsAndServices().subscribe((productsAndServices: [ProductServiceResponse]) => {
      productsAndServices.forEach((productService) => {
        const category = productService.categoryDescription.toLocaleLowerCase();
        this[category] = productService.productsServices;
        this.categories[category] = productService.categoryId;
      });
      this.productsBySubCategory = this.utilities.groupBy(this.product, 'subCategoryDescription');
      this.productsBySubCategory = Object.values(this.productsBySubCategory);
      this.servicesBySubCategory = this.utilities.groupBy(this.service, 'subCategoryDescription');
      this.servicesBySubCategory = Object.values(this.servicesBySubCategory);
    });
  }

}
