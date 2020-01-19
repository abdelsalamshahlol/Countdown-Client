import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services';

//temporary
import { ProductService } from '../../../services/product.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() isFixed = true;
  @Input() isTransparent = true;
  @Input() detachOnScroll = 200;
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isLoggedIn() ? true : false;
    console.log(this.isLoggedIn);
  }

  //temporary
  addProducts(){
    this.productService.getAllProducts().subscribe(async products => {
      await this.productService.populateFakeDatabase();
      console.log("done adding products")
    })
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
