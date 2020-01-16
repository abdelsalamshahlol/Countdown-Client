import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productDetails',
  templateUrl: './productDetails.component.html',
  styleUrls: ['./productDetails.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product= { 
    id: "1",
    name: "Product 1",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    image: 'https://source.unsplash.com/1600x900/?product',
    category: "Sport",
    last_auction_price: 800,
    value: 620,
    end_date: "23:00:00"
  }
  constructor() { }

  ngOnInit() {
    // service to get the element data by his id
  }

}
