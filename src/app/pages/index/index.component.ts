import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators'

import { User } from '../../models';
import { UserService, AuthenticationService } from '../../services'



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  loading = false;
  users: User[];

  constructor( private userService: UserService ) { }

  ngOnInit() {
    // this.loading = true;
    // this.userService.getAll()
    //   .pipe(first())
    //   .subscribe(users => {
    //     this.loading = false;
    //     this.users = users
    //   })
  }

}
