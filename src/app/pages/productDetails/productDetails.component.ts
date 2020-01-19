import {Component, OnDestroy, OnInit} from '@angular/core';
import {BidService} from '../../services/bid.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Product} from '../../models/product';
import {User} from '../../models/user';
import {ProductService} from '../../services/product.service';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Auction} from '../../models/auction';
 
@Component({
  selector: 'app-productDetails',
  templateUrl: './productDetails.component.html',
  styleUrls: ['./productDetails.component.scss']
})

export class ProductDetailsComponent implements OnInit, OnDestroy {
  auction: Auction;
  product: Product;
  owner: User;
  productId: string;
  private userToken;
  isDisabled = false;

  participantsList: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private bidService: BidService,
    private authenticationService: AuthenticationService
  ) {
  }

  // bid(amount) {
  //   // console.log('bidding');
  //   if (amount > this.product.last_auction_price) {
  //     this.auction = {
  //       last_auction_price: amount,
  //       userId: this.authenticationService.currentUserValue.userId
  //     }
  //     this.productService.updateProduct(this.auction, this.productId).subscribe(newAuction => {
  //       this.product.last_auction_price = newAuction.product.last_auction_price;
  //       this.product.participants = newAuction.product.participants
  //       this.participantsList = newAuction.product.participants
  //       console.log(this.product.participants)
  //     })
  //   } else {
  //     // handle the amount lower than our amount
  //   }
  // }


  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params.id;
    this.productService.getProductById(this.productId).subscribe(product => {
      this.product = product;
      this.participantsList = product.participants;
      console.log(this.participantsList);

      this.userService.getUserById(this.product.owner).subscribe(owner => {
        this.owner = owner;
      });
    });

    // Connect to the product bidding
    this.bidService.joinLiveBid(this.productId);

    // Get the current user token
    this.authenticationService.currentUser.subscribe(user => {
      this.userToken = user.token;
    });


    // Handle broadcasts
    this.bidService.handleBroadCast().subscribe((result) => {
      // console.log(result.currentValue);
      // @ts-ignore
      this.product.value = result.currentValue;
      this.isDisabled = false;
      // Play notification sound
      const alertSound = new Audio('assets/sounds/bid.mp3');
      alertSound.play().catch(err => {
        console.log('Can\'t play sound');
      });
    });
  }

  bid(value) {
    const userBid = {
      value,
      productId: this.productId,
      token: this.userToken
    };
    // console.log(userBid);
    this.isDisabled = true;
    this.bidService.bidOnProduct(userBid);
  }

  ngOnDestroy() {
    // console.log('destroyed');
    this.bidService.leaveLiveBid(this.productId);
  }
}
