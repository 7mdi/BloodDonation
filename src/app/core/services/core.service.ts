import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contact } from '../_models/contact';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  getAllSections() {
    return this.http.get<any>(`${environment.APIURL}/Section/Get`);

  }

  getAllNews() {
    return this.http.get<any>(`${environment.APIURL}/News/Get`);

  }

  getBlogById(id:number) {
    return this.http.get<any>(`${environment.APIURL}/News/Get${id}`);

  }

  sendNewContact(neederObj : Contact) {
    return this.http.post<any>(`${environment.APIURL}/Contact/Post`,neederObj)

  }

  getNumberOfRequestForEachType(bloodType:string){
    return this.http.get<any>(`${environment.APIURL}/DonationRequest/GetByBloodType?bloodType=${bloodType}`);

  }
}
