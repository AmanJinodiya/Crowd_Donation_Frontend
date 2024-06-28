import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private userService : UserService) {}

  containerActive: boolean = false;

  public user = {
    username: '',
    password: '',
  };



  public userSignup = {
    username: '',
    password: '',
    name : '',
    email : '',
    admin: false
  };


  toggleContainer() {
    this.containerActive = !this.containerActive;
  }

  userLogin() {
    if (this.user.username == '' || this.user.password == '') {
      alert('Invalid Credentials');
      return;
    }

    this.userService.logIn(this.user).subscribe(
      (data : any) =>{

        console.log(data)
        this.userService.loginUser(data.jwtToken);
        console.log(this.userService.getToken())

        this.userService.currentUser(data.username).subscribe(
          (data)=>{
            console.log(data);
            this.userService.setUser(data);
            console.log(this.userService.isUserAdmin())
            if(this.userService.isUserAdmin() == true){
              
              // this.userService.loginStatusSubject.next(true);
               window.location.href = '/admin'
            }
            else if(this.userService.isUserAdmin() == false){
              // this.userService.loginStatusSubject.next(true);
              window.location.href = '/home'
            }
            else this.userService.logOut();
          },
          (error)=>{
            console.log(error);
          }
        )


      },
      (error)=>{
        Swal.fire("Error","Server Error try again!","error")
      }
    )

  }

  logout(){
    this.userService.logOut();
  }

  createUser(){
    if (this.userSignup.username == '' || this.userSignup.password == '' || this.userSignup.email == '') {
      alert('Invalid Credentials');
      return;
    }

    this.userService.createUser(this.userSignup).subscribe(
      (data)=>{
        this.user.username = this.userSignup.username
        this.user.password = this.userSignup.password
        this.userLogin();
        Swal.fire("Success","User Created Successfully","success")

      },
      (error)=>{
        Swal.fire("Error","Server Error try again!","error")
        console.log(error)
      }
    )



  }
}
