import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() isFixed = true;
  @Input() isTransparent = true;
  @Input() detachOnScroll = 200;

  constructor() {
  }

  ngOnInit() {
  }

}
