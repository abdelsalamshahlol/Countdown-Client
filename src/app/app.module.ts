import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Components
import {AppComponent} from './app.component';
import {IndexComponent} from './pages/index/index.component';
import {ProductComponent} from './pages/product/product.component';
import { NavbarComponent } from './components/UI/navbar/navbar.component';
import { FooterComponent } from './components/UI/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';

// Routes array
const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'product', component: ProductComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ProductComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
