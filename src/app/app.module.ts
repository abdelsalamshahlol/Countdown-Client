import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


// Components
import {AppComponent} from './app.component';
import {IndexComponent} from './pages/index/index.component';
import {ProductComponent} from './pages/product/product.component';
import {NavbarComponent} from './components/UI/navbar/navbar.component';
import {FooterComponent} from './components/UI/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { PricingComponent } from './components/UI/pricing/pricing.component';
import { AddProductComponent } from './components/UI/add-product/add-product.component';

// Routes array
const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'product', component: ProductComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add', component: AddProductComponent}
];

// Testing jQuery
declare var $: any;
console.log(`jQuery version: ${$.fn.jquery}`);

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ProductComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    PricingComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
