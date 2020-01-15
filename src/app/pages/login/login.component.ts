import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  userData: any = [];

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  // easy way to get all the form fields
  get f() { return this.registerForm.controls }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.userData.push(this.registerForm.value);
    console.log(this.userData)
    
  }
}
