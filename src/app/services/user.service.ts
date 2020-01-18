import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        /**
         * TODO: this function responsable for getting all users ,
         * not finished yet , i will get back to it
         */
        // return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }
}
