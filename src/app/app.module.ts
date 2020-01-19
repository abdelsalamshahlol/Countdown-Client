import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';

// Helpers
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {AuthGuard} from './helpers/auth.guard';
import {Ng5SliderModule} from 'ng5-slider';
import {CountdownTimerModule} from 'ngx-countdown-timer';

// Components
import {AppComponent} from './app.component';
import {IndexComponent} from './pages/home/index.component';
import {ProductComponent} from './pages/products/product.component';
import {NavbarComponent} from './components/UI/navbar/navbar.component';
import {FooterComponent} from './components/UI/footer/footer.component';
import {DashboardComponent} from './pages/account/dashboard/dashboard.component';
import {StatsComponent} from './components/account-UI/stats/stats.component';
import {SidebarComponent} from './components/account-UI/sidebar/sidebar.component';
import {HomeComponent} from './pages/account/home/home.component';
import {ProductUserComponent} from './pages/account/product-user/product-user.component';
import {SignupComponent} from './pages/signup/signup.component';
import {LoginComponent} from './pages/login/login.component';
import {AddProductComponent} from './components/account-UI/add-product/add-product.component';
import {ProductDetailsComponent} from './pages/productDetails/productDetails.component';
import {ContactComponent} from './pages/contact/contact.component';

import {AuthGuard} from './helpers/auth.guard';
import { UsersComponent } from './pages/account/users/users.component';
import { UserproductsComponent } from './pages/userproducts/userproducts.component';
import { WonproductsComponent } from './pages/wonproducts/wonproducts.component';

// Routes array
const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'products', component: ProductComponent, canActivate: [AuthGuard]},
  {
    path: 'account', component: DashboardComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'product', 
        children: [
          {path: '', component: ProductUserComponent},
          {path: 'allproducts', component: UserproductsComponent},
          {path: 'wonproducts', component: WonproductsComponent},
        ]
      },
      {path: 'users', component: UsersComponent}
    ], canActivate: [AuthGuard]
  },
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'products/:id', component: ProductDetailsComponent, canActivate: [AuthGuard]},
  {path: 'contact', component: ContactComponent}
];

declare var $: any;

const config: SocketIoConfig = {url: 'http://localhost:8085', options: {}};

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
    AddProductComponent,
    ProductDetailsComponent,
    ContactComponent,
    UsersComponent,
    UserproductsComponent,
    WonproductsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    Ng5SliderModule,
    SocketIoModule.forRoot(config),
    CountdownTimerModule.forRoot(),
    Ng5SliderModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {
}
