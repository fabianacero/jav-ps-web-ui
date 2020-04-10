import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../provider/products/products.service';
import {ProductServiceResponse} from '../../models/product-service-response';
import {ProductServiceDetail} from '../../models/product-service-detail';
import {Utilities} from '../../utilities/utilities';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public product: ProductServiceDetail;
  public service: ProductServiceDetail;
  public productsBySubCategory;

  constructor(private productsService: ProductsService, private utilities: Utilities) {
  }

  ngOnInit(): void {
    this.productsService.getAllProductsAndServices().subscribe((productsAndServices: [ProductServiceResponse]) => {
      productsAndServices.forEach((productService) => {
        const category = productService.categoryDescription.toLocaleLowerCase();
        this[category] = productService.productsServices;
      });
      this.productsBySubCategory = this.utilities.groupBy(this.product, 'subCategoryDescription');
      this.productsBySubCategory = Object.values(this.productsBySubCategory);
    });
  }

}
