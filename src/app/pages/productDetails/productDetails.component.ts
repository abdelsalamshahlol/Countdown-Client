import {Component, OnDestroy, OnInit} from '@angular/core';
import {BidService} from '../../services/bid.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Product} from '../../models/product';
import {User} from '../../models/user';
import {ProductService} from '../../services/product.service';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Auction} from '../../models/auction';
import {FormBuilder, Validators, FormControl} from "@angular/forms";

@Component({
  selector: 'app-productDetails',
  templateUrl: './productDetails.component.html',
  styleUrls: ['./productDetails.component.scss']
})

export class ProductDetailsComponent implements OnInit, OnDestroy {
  // auction: Auction;
  product: Product;
  owner: User;
  productId: string;
  private userToken;
  participantsList: any;
  bidForm;
  submitted: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private bidService: BidService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
    this.bidForm = this.formBuilder.group({
        amount:['', [Validators.required, Validators.minLength(1)]],
    })
  }

  bid(amount) {
    this.submitted = true;
    if (amount > this.product.last_auction_price) {
      const userBid = {
        last_auction_price: amount,
        productId: this.productId,
        userToken: this.userToken
      };
      this.bidService.bidOnProduct(userBid);
    } else {
      // handle the amount lower than our amount
    }
  }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params.id;
    this.productService.getProductById(this.productId).subscribe(product => {
      this.product = product;
      this.participantsList = product.participants;
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
      // console.log({result});

      // @ts-ignore
      this.product.last_auction_price = result.product.last_auction_price;
      // @ts-ignore
      this.product.participants = result.product.participants;
      // @ts-ignore
      this.participantsList = result.product.participants;

      // Play notification sound
      const alertSound = new Audio('assets/sounds/bid.mp3');
      alertSound.play().catch(err => {
        console.error('Can\'t play sound ' + err);
      });
    });
  }

  get f() {
    return this.bidForm.controls;
  }

  ngOnDestroy() {
    // console.log('destroyed');
    // leave bid on page change
    this.bidService.leaveLiveBid(this.productId);
  }
}
