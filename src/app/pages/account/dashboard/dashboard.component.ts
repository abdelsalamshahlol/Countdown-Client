import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RouterOutlet, Router} from '@angular/router';
import {fader} from '../../../helpers/route-animations';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None // Ignore global CSS from styles array and use the one given in component SCSS
  , animations: [fader]
})
export class DashboardComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.isAdmin = this.authenticationService.currentUserValue.isAdmin
  }

  public getAdmin() {
    return this.isAdmin
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  
}
