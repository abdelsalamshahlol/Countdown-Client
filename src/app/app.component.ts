import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {fader} from './helpers/route-animations';
import {RouterOutlet, Router} from '@angular/router';
import { AuthenticationService } from './services';
import { User } from './models';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fader]
})
export class AppComponent {

  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  title = 'Countdown | Buy and Sell easily';


  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
