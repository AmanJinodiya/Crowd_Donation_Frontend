


import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private userService : UserService,
    private router : Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Your logic for determining if the user is allowed to activate the route goes here
     // Or false based on your logic
    //  console.log(this.userService.isLoggedIn())
     if(typeof localStorage !== 'undefined' && this.userService.isLoggedIn() && this.userService.isUserAdmin() == true) return true;
     this.router.navigate(['/'])
    return false;
  }
}