import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import * as faker from 'faker'

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    fakeUser: User;
    baseurl: string = "http://localhost:8085/api/user/";

    getAllUsers(){
        return this.http.get<User[]>(this.baseurl + 'getAll');
    }

    getUserById(id: string) {
        return this.http.get<User>(this.baseurl + '/' + id);
    }

    deleteUser(_id: string) {
        return this.http.delete(this.baseurl + 'delete/' + _id);
    }

    addUser(user: User){
        console.log("adding user")
        return this.http.post(this.baseurl + 'signup', user)
    }

    // populateFakeDatabase(num: number){
    //     console.log("entering populate users")
    //     for (var i = 0; i < num; i++){
    //         this.fakeUser = {
    //             email: "customer"+i+"@gmail.com",
    //             password: "password",
    //             firstName: faker.name.firstName(),
    //             lastName: faker.name.lastName()
    //         }
    //         this.addUser(this.fakeUser).subscribe( user => {
    //             console.log(user)
    //         })
    //         console.log("added user" + i)
    //     }
    // }
}
