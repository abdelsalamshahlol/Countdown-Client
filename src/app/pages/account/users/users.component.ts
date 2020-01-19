import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  /**
   * I think the name is not clear , anyway this function used to get all users and show 
   * them to the admin inside the dashboard
   */

  users: any = [];

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this._userService.getAllUsers().subscribe(data => {
      // Got the data save them inside users array
      this.users = data;
    })
  }

}
