import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {AlertComponent} from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  signupForm: FormGroup;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  private closeSub: Subscription;


  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {}


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

    let authObs: Observable <AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
     authObs = this.authService.login(email, password);
    } else {
     authObs = this.authService.signup(email, password);
    }
    // For getting access to response data from server
    authObs.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);

      },
      errorMessage => {
        // console.log(errorResponse.error.error.message);
        // this.error=errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );
    this.signupForm.reset();

    }

    onHandleError() {
      this.error = null;
    }
    // For showing alert component dynamically
    private showErrorAlert(message: string) {
    const alertCmpFactory =  this.componentFactoryResolver.
    resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
