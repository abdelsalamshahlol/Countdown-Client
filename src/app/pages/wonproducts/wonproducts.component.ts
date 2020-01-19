import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services';
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-wonproducts',
  templateUrl: './wonproducts.component.html',
  styleUrls: ['./wonproducts.component.scss']
})
export class WonproductsComponent implements OnInit {
  
  wonProducts: any = [];

  constructor(
    private _authenticationService: AuthenticationService,
    private _productService: ProductService
  ) { }

  ngOnInit() {
    let userId = this._authenticationService.currentUserValue.userId
    this._productService.getProductsByWinner(userId)
      .subscribe(products => {
        console.log(products)
        this.wonProducts = products
      })
  }

}
