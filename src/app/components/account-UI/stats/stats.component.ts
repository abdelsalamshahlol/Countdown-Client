import {Component, OnInit, Input} from '@angular/core';
import { DashboardComponent } from '../../../pages/account/dashboard/dashboard.component'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input() products = 0;
  @Input() productsSold = 0;
  @Input() productsBought = 0;
  @Input() auctionsEntered = 0;

  constructor(
    private _dashboard: DashboardComponent,
  ) { }

  isAdmin() {
    return this._dashboard.isAdmin;
  }

  ngOnInit() {
  }

}
