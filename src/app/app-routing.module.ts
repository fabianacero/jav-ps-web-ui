import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {RegistrationComponent} from './pages/registration/registration.component';
import {LoginComponent} from './pages/login/login.component';
import {AccountComponent} from './pages/account/account.component';
import {LoginGuard} from './guards/login.guard';
import {QuotesComponent} from './pages/quotes/quotes.component';
import {EstadisticaComponent} from './pages/estadistica/estadistica.component';
import {SubcategoryComponent} from './pages/subcategory/subcategory.component';
import {ProductComponent} from './pages/product/product.component';
import {ProvideradmComponent} from './pages/provideradm/provideradm.component';
import {ProviderQuotesComponent} from './pages/provider-quotes/provider-quotes.component';

const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'inicio', component: HomeComponent},
  {path: 'crea-tu-cuenta', component: RegistrationComponent},
  {path: 'ingresa', component: LoginComponent},
  {path: 'mi-cuenta', component: AccountComponent, canActivate: [LoginGuard]},
  {path: 'mis-cotizaciones', component: QuotesComponent, canActivate: [LoginGuard]},
  {path: 'cotizaciones-solicitadas', component: ProviderQuotesComponent, canActivate: [LoginGuard]},
  {path: 'ver-dashboard', component: EstadisticaComponent, canActivate: [LoginGuard]},
  {path: 'ver-subcategoria', component: SubcategoryComponent, canActivate: [LoginGuard]},
  {path: 'ver-producto', component: ProductComponent, canActivate: [LoginGuard]},
  {path: 'ver-proveedor', component: ProvideradmComponent, canActivate: [LoginGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
