import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from '../helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  public loginStatusSubject = new Subject<boolean>();

  createUser(userData : any){
    return this.http.post(`${baseurl}/user/`,userData)
  }

  userById(id : any){
    return this.http.get(`${baseurl}/user/${id}`)
  }


  createOrder(orderData : any){
    return this.http.post(`${baseurl}/user/createOrder`,orderData)
  }

  allUser(){
    return this.http.get(`${baseurl}/user/`)
  }

  // token part

  public logIn(data : any){
    return this.http.post(`${baseurl}/auth/login`,data);
  }

  public currentUser(username : any){
    return this.http.get(`${baseurl}/user/${username}`);
  }

  public loginUser(token : any){
    this.loginStatusSubject.next(true);
    localStorage.setItem('token',token);
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null) return false;
    return true;
  }

  public logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user : any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }
    this.logOut();
    return null;
  }

  public isUserAdmin(){
    let userStr:any = this.getUser();
    
    return (userStr.admin == true);
  }


}
