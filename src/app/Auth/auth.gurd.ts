import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean|UrlTree
  | Promise<boolean |UrlTree> |
  Observable<boolean|UrlTree> {

   return this.authService.userOb.pipe(take(1),map(user => {
     const isAuth = !!user;
     if (isAuth) {
       return true;
     }
     // UrlTree for routing to other component if authentication is not valid
     return this.router.createUrlTree(['/auth']);
   }));
  }
}
