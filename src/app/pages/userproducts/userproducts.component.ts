import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services';
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-userproducts',
  templateUrl: './userproducts.component.html',
  styleUrls: ['./userproducts.component.scss']
})
export class UserproductsComponent implements OnInit {

  userProducts: any = [];

  constructor(
    private _authenticationService: AuthenticationService,
    private _productService: ProductService

  ) { }

  ngOnInit() {
    let userId = this._authenticationService.currentUserValue.userId
    this._productService.getProductsByUserId(userId)
      .subscribe(products => {
        console.log(products)
        this.userProducts = products
      })
    // console.log(this.authenticationService.currentUserValue)
  }

}
