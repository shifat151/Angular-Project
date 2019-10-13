import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading=false;
  signupForm: FormGroup;
  error:string=null;


  constructor(private authService: AuthService,
              private router:Router){}


  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.minLength(6))
    });
    // this.signupForm.get('email').setValue('newton152@gmail.com');



  }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }





  onSubmit() {
    console.log(this.signupForm);
    if (!this.signupForm.valid) {
      return;
    }

    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;

    let authObs:Observable<AuthResponseData>;

    this.isLoading=true;

    if (this.isLoginMode) {
     authObs= this.authService.login(email,password);
    }
    else{
     authObs= this.authService.signup(email, password);
    }

    authObs.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoading=false;
        this.router.navigate(['/recipes']);

      },
      errorMessage => {
        // console.log(errorResponse.error.error.message);
        this.error=errorMessage;
        this.isLoading=false;
      }
    );
    this.signupForm.reset();

    }


}
