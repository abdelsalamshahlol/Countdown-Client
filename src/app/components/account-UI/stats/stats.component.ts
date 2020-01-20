import {Component, OnInit, Input} from '@angular/core';
import { DashboardComponent } from '../../../pages/account/dashboard/dashboard.component'
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input() products = [];
  @Input() productsSold = 0;
  @Input() productsBought = 0;
  @Input() auctionsEntered: 0;

  constructor(
    private _dashboard: DashboardComponent,
    private _productService: ProductService
  ) {
    this._productService.getAllProductsAdmin()
    .subscribe(result => {
      console.log(result)
      this.products = result
      for (let product of this.products) {
        console.log(product.participants, product.winner)
        if ( product.participants.length !== 0 ) {
          this.auctionsEntered++;
        }
        if ( product.winner !== undefined) {
          this.productsSold++;
        }
      }
    })
   }

  isAdmin() {
    return this._dashboard.isAdmin;
  }

  ngOnInit() {

  }

}
