import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePassword } from '../../Profile/_models/change-password';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private userName$ = new BehaviorSubject<string>("");
  private email$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private id$ = new BehaviorSubject<string>("");

  constructor(private http:HttpClient) { }

  getAllUsers(){
    return this.http.get<any>(`${environment.APIURL}/Auth/GetAllUsers`);
     
   }

   changePassword(obj:ChangePassword){
    return this.http.post<ChangePassword>(`${environment.APIURL}/Auth/changePassword`,obj)

   }
   
  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    this.role$.next(role);
  }

  public getUserNameFromStore(){
    return this.userName$.asObservable();
  }

  public setUserNameForStore(fullname:string){
    this.userName$.next(fullname)
  }

  public getUserIdFromStore(){
    return this.id$.asObservable();
  }

  public setUserIdForStore(id:string){
    this.id$.next(id)
  }

  public getEmailFromStore(){
    return this.email$.asObservable();
  }

  public setEmailForStore(email:string){
    this.email$.next(email)
  }

}
