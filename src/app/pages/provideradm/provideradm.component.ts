import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProviderAdm} from '../../models/provideradm';
import {Router} from '@angular/router';
import {Routes} from '../../enums/routes.enum';
import {ProvideradmService} from '../../provider/provideradm/provideradm.service';

@Component({
  selector: 'app-provideradm',
  templateUrl: './provideradm.component.html',
  styleUrls: ['./provideradm.component.scss']
})
export class ProvideradmComponent implements OnInit {

  public model: ProviderAdm;
  public routes = Routes;

  constructor(private provideradm: ProvideradmService, private router: Router) { }

  ngOnInit(): void {
    this.model = new ProviderAdm();
    this.model.tipoDocumento = 2;
    this.model.tipoCategoria = 1;
    
  }
  public onSubmit(registerForm: NgForm) {

    if (!registerForm.valid) {
      return false;
    }
    
    this.provideradm.providerAdmRegistry(registerForm).subscribe((response: any) => {
      alert('Proveedor creado correctamente!!');
      this.router.navigate([Routes.HOME]);
    }, (error) => {
      registerForm.form.controls.userName.setErrors({incorrect: true});
      return false;
    });

  }

}
