import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {throwError, Subject, BehaviorSubject} from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

export interface AuthResponseData {

    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;

}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  // BehaviorSubject helps to recover the previously emitted data even if the subject is not emitting at this point of time
  userOb = new BehaviorSubject<User>(null);
  token: string = null;
  private tokenExpirationTimer:any;

  signup(Email: string, Password: string) {
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpu_Ae9KwoFukWURHZ3tY2e6GXyDMND94',
    {
      email: Email,
      password: Password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError), tap(responseData => {
        responseData => {
          this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        };

      })
    );

  }


  login(Email: string, Password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDpu_Ae9KwoFukWURHZ3tY2e6GXyDMND94',
    {
      email: Email,
      password: Password,
      returnSecureToken: true
    }
    ).pipe(catchError(this.handleError), tap(responseData => {
      this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
    }));

  }
  // For getting access to the response data
  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
     const expirationData = new Date(new Date().getTime() + expiresIn * 1000);
     const user = new User( email,
                            userId,
                            token,
                            expirationData);
     this.userOb.next(user);
    //  For auto log out after invalid time of token
     this.autoLogOut(expiresIn*1000);
     // Storing data in local storage for getting those after relaod
     localStorage.setItem('userData', JSON.stringify(user));
     console.log(user);

  }
    // For autoLogin retrieve the data from localStorage
  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.userOb.next(loadedUser);
      // For autoLogout

      const expirationDuration=new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
      this.autoLogOut(expirationDuration);
    }
  }

  // For logout the user
  logOut() {
    this.userOb.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    //If user logout manually then there will be a timer on autoLogout that will logout after a given time
    // To block that time we have to clear the timer
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer=null;


  }
  // For automatic logout
  autoLogOut(expirationDuration: number){
    this.tokenExpirationTimer=setTimeout(()=>{
      this.logOut();
    },expirationDuration);

  }
  // For catching error and show alert
  private handleError(errorResponse: HttpErrorResponse) {

    let errorMessage = 'An unknown error occured!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    } else {
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already!';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exist!';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Password does not match with the email!';
          break;
    }

      return throwError(errorMessage);

    }
  }

}
