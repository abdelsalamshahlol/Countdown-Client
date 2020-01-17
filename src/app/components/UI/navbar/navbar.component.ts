import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() isFixed = true;
  @Input() isTransparent = true;
  @Input() detachOnScroll = 200;
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isLoggedIn() ? true : false
    console.log(this.isLoggedIn)
  }



  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
