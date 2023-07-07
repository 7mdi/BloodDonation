import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

   editNeedyRequestByUser(id:string,neederObj:any){
    return this.http.put<any>(`${environment.APIURL}/NeedRequest/Put/${id}`,neederObj);

   }

   editUserInformation(userObj:User, id:string){
    return this.http.put<any>(`${environment.baseUrl}/User/EditUser?Id=${id}`,userObj);

  }

   getUserInformation(id:string){
    return this.http.get<any>(`${environment.baseUrl}/User/GetUser/${id}`);

   }
   
}
