import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[];

  constructor(
    private http: HttpClient, 
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products
    })
  }

}
