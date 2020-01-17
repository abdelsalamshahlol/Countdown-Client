import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  isValid: boolean = true;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

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
    console.log(this.registerForm.value)
    this.http.post<any>('http://localhost:8085/api/user/login', this.registerForm.value)
    .subscribe(data => {
      if ( data.authed ) {
        // TODO: redirect user!
      } else {
        if ( data.msg === 'user doesnt exist' ) {
          // TODO: show something red
          this.isValid = false;
        }
        if ( data.msg === 'incorrect password !' ) {
          // TODO: show something red
          this.isValid = false;
        }
        if ( data.msg === 'some error...' ) {
          // TODO: show something red
          this.isValid = false;
        }
      }
    })
    
  }
}
