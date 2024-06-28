import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  userData: any 

  constructor(private userService : UserService){}

  ngOnInit(): void {
    this.userData = this.userService.getUser();
  }


  



}
