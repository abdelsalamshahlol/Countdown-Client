import {Component, OnInit, Input} from '@angular/core';

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

  constructor() {
  }

  ngOnInit() {
  }

}
