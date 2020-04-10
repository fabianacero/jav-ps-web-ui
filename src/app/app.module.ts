import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {ContentComponent} from './components/content/content.component';
import {HomeComponent} from './pages/home/home.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {BannerComponent} from './components/banner/banner.component';
import {ProductsComponent} from './components/products/products.component';
import {ServicesComponent} from './components/services/services.component';
import {FaqsComponent} from './components/faqs/faqs.component';
import {RegistrationComponent} from './pages/registration/registration.component';
import {LoginComponent} from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpRequestService} from './provider/http-request/http-request.service';
import {HttpClientModule} from '@angular/common/http';
import { MustMatchDirective } from './directives/must-match.directive';
import { AccountComponent } from './pages/account/account.component';
import { CryptPipe } from './pipes/crypt.pipe';
import { ProductsDirective } from './directives/products.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    HomeComponent,
    PageNotFoundComponent,
    BannerComponent,
    ProductsComponent,
    ServicesComponent,
    FaqsComponent,
    RegistrationComponent,
    LoginComponent,
    MustMatchDirective,
    AccountComponent,
    CryptPipe,
    ProductsDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [HttpRequestService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
