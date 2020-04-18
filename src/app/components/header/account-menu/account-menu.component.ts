import {Component, Input, OnInit} from '@angular/core';
import {Routes} from '../../../enums/routes.enum';
import {Utilities} from '../../../utilities/utilities';
import {Router} from '@angular/router';
import {Session} from '../../../models/session';
import {Profiles} from '../../../enums/profiles.enum';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {

  @Input() session: Session;
  public routes = Routes;
  public options = [];

  constructor(private utilities: Utilities, private router: Router) {
  }

  ngOnInit(): void {

    if (this.session.profile === Profiles.CLIENTE) {
      this.options.push({routerLink: Routes.QUOTES, label: 'Mis Cotizaciones'});
    }

    if (this.session.profile === Profiles.PROVEEDOR) {
      this.options.push({routerLink: Routes.PRIVIDER_QUOTES, label: 'Tus Solicitudes de Cotizacion'});
    }

    if (this.session.profile === Profiles.ADMINISTRADOR) {
      this.options.push({routerLink: Routes.DASHBOARD, label: 'DashBoard'});
      this.options.push({routerLink: Routes.SUBCATEGORIA, label: 'Subcategorías'});
      this.options.push({routerLink: Routes.PRODUCTO, label: 'Productos'});
      this.options.push({routerLink: Routes.PROVEEDORES, label: 'Proveedores'});
    }
  }

  public logOut() {
    this.utilities.removeOnSession('session');
    this.router.navigate([Routes.HOME]);
  }
}
