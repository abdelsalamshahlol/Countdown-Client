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

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.userData.push(this.registerForm.value);
    console.log(this.userData)
    // this.userData.push(JSON.stringify(this.registerForm.value))
    // alert('SUCCESS!! :) \n\n' + JSON.stringify(this.registerForm.value, null, 4));

  }



}
