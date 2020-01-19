import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../../../pages/account/dashboard/dashboard.component'

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private _dashboard: DashboardComponent,
  ) { }
  

  isAdmin() {
    return this._dashboard.isAdmin;
  }

  ngOnInit() {
    // console.log(this.isAdmin())
    // console.log(this._dashboard)
  }

}
