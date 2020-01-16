import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products = [
    { id: "1",
      name: "Product 1",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      image: 'https://source.unsplash.com/1600x900/?product',
      category: "Sport",
      last_auction_price: 800,
      value: 620,
      end_date: "23:00:00"
    },
    { id: 2,
      name: "Product 2",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      image: 'https://source.unsplash.com/1600x900/?product',
      category: "Sport",
      last_auction_price: 800,
      value: 620,
      end_date: "23:00:00"
    },
    { id: 3,
      name: "Product 3",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      image: 'https://source.unsplash.com/1600x900/?product',
      category: "Sport",
      last_auction_price: 800,
      value: 620,
      end_date: "23:00:00"
    },
    { id: 5,
      name: "Product 4",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      image: 'https://source.unsplash.com/1600x900/?product',
      category: "Sport",
      last_auction_price: 800,
      value: 620,
      end_date: "23:00:00"
    },
    { id: 6,
      name: "Product 5",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      image: 'https://source.unsplash.com/1600x900/?product',
      category: "Sport",
      last_auction_price: 800,
      value: 620,
      end_date: "23:00:00"

    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
