import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../../../pages/account/dashboard/dashboard.component'
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userName: string = '';
  constructor(
    private _dashboard: DashboardComponent,
    private _userService: UserService
  ) { }
  

  isAdmin() {
    return this._dashboard.isAdmin;
  }

  ngOnInit() {
    let currentUser = this._dashboard.getUser()
    this._userService.getUserById(currentUser.userId)
      .subscribe(user => {
        this.userName = `${user.firstName} ${user.lastName}`
      })
  }

  logout() {
    this._dashboard.logout()
  }

}
