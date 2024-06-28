import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../../services/donation/donation.service';

import Swal from 'sweetalert2';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-adash',
  templateUrl: './adash.component.html',
  styleUrl: './adash.component.css'
})
export class AdashComponent implements OnInit{

  constructor(private userService : UserService){}
  ngOnInit(): void {
    this.userService.allUser().subscribe(

      (data)=>{
        console.log(data)
      },
      (error)=>{
        console.log(error)
      }


    )
  }




}
