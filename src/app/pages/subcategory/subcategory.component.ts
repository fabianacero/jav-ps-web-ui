import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {SubCategory} from '../../models/subcategory';
import {Router} from '@angular/router';
import {Routes} from '../../enums/routes.enum';
import {SubcategoryService} from '../../provider/subcategory/subcategory.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {

  public model: SubCategory;
  public routes = Routes;

  constructor(private subcategory: SubcategoryService, private router: Router) {
  }
  ngOnInit(): void {
    this.model = new SubCategory();
    this.model.categoryType = 2;
  }

  public onSubmit(registerForm: NgForm) {

    
    if (!registerForm.valid) {
      return false;
    }
    
    this.subcategory.subCategoriaRegistry(registerForm).subscribe((response: any) => {
      alert('Sub Categoría creada correctamente!');
      
    }, (error) => {
      registerForm.form.controls.userName.setErrors({incorrect: true});
      return false;
    });

  }

}
