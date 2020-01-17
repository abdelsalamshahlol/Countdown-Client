import {Component, OnInit} from '@angular/core';
import {Options, LabelType} from 'ng5-slider';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private productService: ProductService
  ) {
  }

  filterForm: FormGroup = new FormGroup({
    sliderControl: new FormControl([0, 0])
  });

  options: Options = {
    floor: 0,
    ceil: 9999,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<small class="currency">TND</small>' + value;
        case LabelType.High:
          return '<small class="currency">TND</small>' + value;
        default:
          return '<small class="currency">TND</small>' + value;
      }
    }
  };

  unfilteredProducts;

  // products: Product[];
  products = [
    {
      id: "1",
      name: "Product 1",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      image: 'https://source.unsplash.com/1600x900/?product',
      category: "Sport",
      last_auction_price: 800,
      value: 620,
      end_date: "23:00:00"
    },
    {
      id: 2,
      name: "Product 2",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      image: 'https://source.unsplash.com/1600x900/?product',
      category: "arts",
      last_auction_price: 800,
      value: 620,
      end_date: "23:00:00"
    },
    {
      id: 3,
      name: "Product 3",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      image: 'https://source.unsplash.com/1600x900/?product',
      category: "Sport",
      last_auction_price: 800,
      value: 620,
      end_date: "23:00:00"
    },
    {
      id: 5,
      name: "Product 4",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      image: 'https://source.unsplash.com/1600x900/?product',
      category: "Sport",
      last_auction_price: 800,
      value: 620,
      end_date: "23:00:00"
    },
    {
      id: 6,
      name: "Product 5",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      image: 'https://source.unsplash.com/1600x900/?product',
      category: "Sport",
      last_auction_price: 800,
      value: 620,
      end_date: "23:00:00"
    }]

  resetForm(): void {
    this.filterForm.reset({sliderControl: [0, 0]});
    this.products = this.unfilteredProducts.slice();

  }

  filterProducts(): void {
    this.products = this.unfilteredProducts.slice();
    const minPrice = this.filterForm.value.sliderControl[0];
    const maxPrice = this.filterForm.value.sliderControl[1];

    this.products = this.products.filter((product) => {
      if (product.value >= minPrice && product.value <= maxPrice) {
        return product;
      }
    });
  }

  filterByCat(category) {
    this.products = this.unfilteredProducts.slice();
    this.products = this.products.filter((product) => category.toLowerCase() === product.category.toLowerCase());
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      // this.products = products;
      this.unfilteredProducts = this.products.slice();
    });
  }

}
