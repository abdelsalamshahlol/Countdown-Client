import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Product} from '../models/product';
import {Auction} from '../models/auction';
import {User} from '../models/user';
import * as faker from 'faker'
import { UserService } from './user.service';

@Injectable({providedIn: 'root'})
export class ProductService {
  fakeProduct: Product;
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

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

  updateWinner(productId: string, winner: User) {    
    return this.http.put(this.baseurl + 'updateWinner/' + productId , {winner})
  }

  sendMail(username: string, email: string) {
    console.log(username)
    console.log(email)
    return this.http.post("http://localhost:8085/sendmail", {username, email})
  }

  getProductsByCategory(category: string) {
    return this.http.get<Product[]>(this.baseurl + 'getByCategory/' + category.toLowerCase());
  }

  getProductsByUserId(userId: string) {
    return this.http.get<Product[]>(this.baseurl + 'getByUser/' + userId);
  }

  populateFakeDatabase() {
    this.userService.getAllUsers().subscribe(users => {
      console.log("Entering populate products")
      let memory="";
      for (let day = 19; day < 20; day++) {
          for (let hour =  5; hour < 8; hour++){

          fetch("https://source.unsplash.com/1600x900/?product").then(img => {
            if (img.url !== memory){
              this.fakeProduct = {
                name: faker.commerce.productName(),
                owner: users[Math.floor(Math.random() * Math.floor(users.length))]._id,
                description: faker.lorem.sentence(20),
                category: ["tourism","home","arts","games","appliances","cars","technology","education","sport"][Math.floor(Math.random() * Math.floor(9))],
                value: parseInt(faker.commerce.price()),
                end_date: new Date(2020, 0, day, hour, Math.random() * Math.floor(60), Math.random() * Math.floor(60)),
                main_img: img.url
              }
              this.addProduct(this.fakeProduct).subscribe( product => {
                console.log(product)
              })
              memory = img.url
            }else {
            }
          })
          console.log("added product")
        }
      }
    })

  }
  
}
