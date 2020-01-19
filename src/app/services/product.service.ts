import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Product} from '../models/product';
import {Auction} from '../models/auction';
import {User} from '../models/user';

@Injectable({providedIn: 'root'})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  baseurl: string = "http://localhost:8085/api/products/";

  getAllProducts() {
    return this.http.get<Product[]>(this.baseurl + 'getAll');
  }

  getProductById(id: string) {
    return this.http.get<Product>(this.baseurl + id);
  }

  addProduct(product: Product) {
    return this.http.post(this.baseurl + 'add', product);
  }

  deleteProduct(id: string) {
    return this.http.get(this.baseurl + 'delete/' + id);
  }

  updateProduct(auction: Auction, id: string) {
    return this.http.put(this.baseurl + 'update/' + id, auction);
  }

  getWinner(id: string) {
    return this.http.get<User>(this.baseurl + 'getwinner/' + id);
  }

  getProductsByCategory(category: string) {
    return this.http.get<Product[]>(this.baseurl + 'getByCategory/' + category.toLowerCase());
  }

  getProductsByUserId(userId: string) {
    return this.http.get<Product[]>(this.baseurl + 'getByUser/' + userId);
  }


}
