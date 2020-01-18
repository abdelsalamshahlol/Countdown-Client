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
  isDisabled: boolean = false;

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

    // Connect to the product bidding
    this.bidService.joinLiveBid(this.productId);

    // Get the current user token
    this.authService.currentUser.subscribe(user => {
      this.userToken = user.token;
    });

    // Handle broadcasts
    this.bidService.handleBroadCast((broadcast) => {
      console.log({broadcast});
      this.isDisabled = false;
    });
  }

  bid(value) {
    const userBid = {
      value,
      token: this.userToken
    };
    this.isDisabled = true;
    this.bidService.bidOnProduct(userBid);
  }

}
