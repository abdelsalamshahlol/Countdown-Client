import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {BidService} from '../../services/bid.service';
import {AuthenticationService} from '../../services/authentication.service.js';

@Component({
  selector: 'app-productDetails',
  templateUrl: './productDetails.component.html',
  styleUrls: ['./productDetails.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  productId: string;
  private userToken;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private bidService: BidService,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params.id;
    this.productService.getProductById(this.productId).subscribe(product => {
      this.product = product;
    });

    // connect to the product bidding
    this.bidService.joinLiveBid(this.productId);
    // get the current user token
    this.authService.currentUser.subscribe(user => {
      this.userToken = user.token;
    });
  }

  bid(value) {
    const userBid = {
      value,
      token: this.userToken
    };
    console.log({userBid})
    // this.bidService.bidOnProduct(userBid);
  }

}
