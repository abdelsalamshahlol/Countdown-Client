import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProductService } from '../../../services/product.service'
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-product-user',
  templateUrl: './product-user.component.html',
  styleUrls: ['./product-user.component.scss']
})
export class ProductUserComponent implements OnInit {

  products: any = [];
  owners = [];

  constructor(
    private _dashboard: DashboardComponent,
    private _productService: ProductService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this._productService.getAllProducts()
      .subscribe(result => {
        // get all products to render
        this.products = result
        for (let product of this.products) {
          this._userService.getUserById(product.owner)
            .subscribe(result => {
              /**
               * i am trying to get the owners of all products so i can
               * display them inside the products page
               */
              this.owners.push(result)
            })
        }
      })
  }

  handleDelete(_id: string) {
    this._productService.deleteProduct(_id)
      .subscribe(result => {
        // product deleted 
      })
  }

  isAdmin() {
    return this._dashboard.isAdmin;
  }

}
