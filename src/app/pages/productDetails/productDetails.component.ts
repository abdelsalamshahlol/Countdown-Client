import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Auction } from '../../models/auction';

@Component({
  selector: 'app-productDetails',
  templateUrl: './productDetails.component.html',
  styleUrls: ['./productDetails.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  auction: Auction
  product: Product;
  owner: User;
  productId: string;
  participantsList: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) { }

  bid(amount) {
    console.log("bidding")
    if (amount>this.product.last_auction_price) {
      this.auction = {
        last_auction_price: amount,
        userId: this.authenticationService.currentUserValue.userId
      }
      this.productService.updateProduct(this.auction, this.productId).subscribe(newAuction => {
        console.log(newAuction)
        // this.product.last_auction_price = newAuction.product.last_auction_price;
        // this.product.participants = newAuction.product.participants
        // this.participantsList = newAuction.product.participants
        // console.log(this.product.participants)
      })
    } else {
      // handle the amount lower than our amount
    }
  }



  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params.id

    this.productService.getProductById(this.productId).subscribe(product => {
      this.product = product
      this.participantsList = product.participants
      console.log(this.participantsList)
      this.userService.getUserById(this.product.owner).subscribe(owner => {
        this.owner = owner
      })
    })

  }

}
