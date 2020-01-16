import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MustMatch } from '../../helpers/must-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  userData: any = [];

  constructor(private _formBuilder: FormBuilder) { }
  /**
   * Here i am using Validator to check all the fields are required
   * Also for the password to be more than 8 Charcaters
   */

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  // easy way to get all the form fields
  get f() { return this.registerForm.controls; }

  /**
   * For now i got the data and show it in the console,
   * it is a temp thing so in advance we gonna send post req and stuff
   */

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.userData.push(this.registerForm.value);
    console.log(this.userData)
    
  }



}
