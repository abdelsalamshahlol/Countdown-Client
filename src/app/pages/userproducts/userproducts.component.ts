import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-userproducts',
  templateUrl: './userproducts.component.html',
  styleUrls: ['./userproducts.component.scss']
})
export class UserproductsComponent implements OnInit {

  currentUser: any = [];
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    console.log(this.authenticationService.currentUserValue)
  }

}
