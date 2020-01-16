import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


// Components

import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { ProductComponent } from './pages/product/product.component';
import { NavbarComponent } from './components/UI/navbar/navbar.component';
import { FooterComponent } from './components/UI/footer/footer.component';

import {DashboardComponent} from './pages/admin/dashboard/dashboard.component';
import {StatsComponent} from './components/admin-UI/stats/stats.component';
import {SidebarComponent} from './components/admin-UI/sidebar/sidebar.component';
import {HomeComponent} from './pages/admin/home/home.component';
import {ProductUserComponent} from './pages/admin/product-user/product-user.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { PricingComponent } from './components/UI/pricing/pricing.component';
import { AddProductComponent } from './components/UI/add-product/add-product.component';
import { ContactComponent } from './pages/contact/contact.component';

// Routes array
const routes: Routes = [

  {path: '', component: IndexComponent},
  {path: 'products', component: ProductComponent},
  {
    path: 'account', component: DashboardComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'product', component: ProductUserComponent}
      
    ]
  },
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contact', component: ContactComponent }

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
    DashboardComponent,
    StatsComponent,
    SidebarComponent,
    HomeComponent,
    ProductUserComponent,
    SignupComponent,
    LoginComponent,
    PricingComponent,
    AddProductComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {
}
