import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProductService } from '../../../services/product.service'

@Component({
  selector: 'app-product-user',
  templateUrl: './product-user.component.html',
  styleUrls: ['./product-user.component.scss']
})
export class ProductUserComponent implements OnInit {

  products: any = [];
  constructor(
    private _dashboard: DashboardComponent,
    private _productService: ProductService
  ) { }

  ngOnInit() {
    this._productService.getAllProducts()
      .subscribe(result => {
        // get all products to render
        this.products = result
        console.log(this.products)
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
