import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrl: './home-navbar.component.css'
})
export class HomeNavbarComponent {

  constructor(private userService : UserService){}

  logout(){
    this.userService.logOut();
    window.location.href = '/login'
  }

}
