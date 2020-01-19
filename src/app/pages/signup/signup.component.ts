import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

/* This function inside helper folder 
 * check if you have 2 input feilds to check the password
 * we don't have it here i don't know why it is here !
 */
import { MustMatch } from '../../helpers/must-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  exist: boolean = false

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }
  /**
   * Here i am using Validator to check all the fields are required
   * Also for the password to be more than 8 Charcaters
   */

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
    this.http.post<any>('http://localhost:8085/api/user/signup', this.registerForm.value)
      .subscribe({
        next: data => {
          console.log(data)
          if ( data.registered ) {
            // TODO: redirect user!
            this.router.navigate(['/login'])
          }
        },
        error: error => this.exist = true
      })
      
    
  }



}
