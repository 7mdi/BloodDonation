import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DonationRequest } from '../_models/donation-request';
import { ApiResponse } from '../_models/response';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private http:HttpClient) { }

  
  getAllDonationRequest(): Observable<ApiResponse<DonationRequest>>{
    return this.http.get<ApiResponse<DonationRequest>>(`${environment.APIURL}/DonationRequest/Get`);

   }

   getDonarsRequestByBloodType(type:string): Observable<ApiResponse<DonationRequest>>{
    return this.http.get<ApiResponse<DonationRequest>>(`${environment.APIURL}/DonationRequest/GetByBloodType?bloodType=${type}`);

  }

  //  getDonarRequestBySectionId(sectionId:number): Observable<ApiResponse<DonationRequest>>{
  //   return this.http.get<ApiResponse<DonationRequest>>(`${environment.APIURL}/DonationRequest/GetBySection/${sectionId}`);

  // }

  getAllDonationRequestByUser(email:string): Observable<ApiResponse<DonationRequest>>{
    return this.http.get<ApiResponse<DonationRequest>>(`${environment.APIURL}/DonationRequest/GetByUserId/${email}`);

   }

   addRequest(donarObj : DonationRequest){   
    return this.http.post<DonationRequest>(`${environment.APIURL}/DonationRequest/Post`,donarObj)

  }

  getDonarRequestById(id:number): Observable<ApiResponse<DonationRequest>>{
    return this.http.get<ApiResponse<DonationRequest>>(`${environment.APIURL}/DonationRequest/Get/${id}`);

  }

  editDonationRequestByUser(id:number,donarObj:DonationRequest){
    return this.http.put<DonationRequest>(`${environment.APIURL}/DonationRequest/Put/${id}`,donarObj);

   }

  deleteDonationRequestByUser(id:number){
    return this.http.delete<any>(`${environment.APIURL}/DonationRequest/Delete${id}`);

   }

  
   getUser(userId:string){
    return this.http.get<any>(`http://donatblood-001-site1.etempurl.com/User/GetUser/${userId}`);
   }

   getNearestNeedy(object: any):Observable<DonationRequest>{
    return this.http.post<DonationRequest>(`${environment.APIURL}/DonationRequest/GetNeersteDonarByLocation`, object);
   }


}
