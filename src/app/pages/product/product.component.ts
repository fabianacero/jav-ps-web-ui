import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Product} from '../../models/product';
import {Router} from '@angular/router';
import {Routes} from '../../enums/routes.enum';
import {ProductService} from '../../provider/product/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public model: Product;
  public routes = Routes;
  subCategorias: any[] = [];


  constructor(private product: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.model = new Product();
    this.model.categoryType = 1;
    this.model.subCategoryType = 1;
    //Obtenemos las sub categorias de los productos
    this.product.getUsers( ).subscribe((data) => { // Success
        this.subCategorias = data[0].subCategories;
      },
      (error) => {
        console.error(error);
      }
    );

  }

  handleChange(  ) {
    this.product.getUsers( ).subscribe((data) => { // Success
      this.subCategorias = data[this.model.categoryType - 1].subCategories;
    },
    (error) => {
      console.error(error);
    }
  );
 }

  public onSubmit(registerForm: NgForm) {

    if (!registerForm.valid) {
      return false;
    }
  
    this.product.productRegistry(registerForm).subscribe((response: any) => {
      alert('Producto creado correctamente!');
      this.model.productDescription = "";
    }, (error) => {
      registerForm.form.controls.userName.setErrors({incorrect: true});
      return false;
    });

  }

}
