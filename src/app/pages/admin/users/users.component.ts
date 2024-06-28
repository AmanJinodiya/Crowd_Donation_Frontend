import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users:any = []

  constructor(private _userService : UserService){}


  ngOnInit(): void {
    this._userService.allUser().subscribe(
      (data)=>{
        this.users = data
        console.log(data)
    },
    (error)=>{
        console.log(error)
        Swal.fire('Error','server error','error')

    
    }
    )

}}
