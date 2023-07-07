import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userPayload:any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
   }

  signUp(userObj: any) {
    return this.http.post<any>(`${environment.APIURL}/Auth/register`, userObj)
  }

  confirmEmail(loginObj : any){       
    return this.http.post<any>(`${environment.APIURL}/Auth/ConfirmEmail`,loginObj)
  }

  signIn(loginObj : any){       
    return this.http.post<any>(`${environment.APIURL}/Auth/login`,loginObj)
  }

  forgotPassword(loginObj : any){       
    return this.http.post<any>(`${environment.APIURL}/Auth/ForgetPass`,loginObj)
  }

  resetPassword(loginObj : any){       
    return this.http.post<any>(`${environment.APIURL}/Auth/ResetPass`,loginObj)
  }
  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getUserIdFromToken(){
    if(this.userPayload)
    return this.userPayload.uid;
  }

  getUserNameFromToken(){
    if(this.userPayload)
    return this.userPayload.sub;
  }

  getEmailFromToken(){
    if(this.userPayload)
    return this.userPayload.email;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.roles;
  }

}
