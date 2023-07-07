import { Injectable } from '@angular/core';
import { HttpClient } from '@microsoft/signalr/dist/esm/HttpClient';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private http:HttpClient) { }

  post(longitude:number, latitude:number, current:number, bloodType:string, donatType:number):any{
    return this.http.post(`https://nearest-donor-hayah-maab.onrender.com/prediction?l1=${longitude}&l2=${latitude}&curr=${current}&BT=${bloodType}&DT=${donatType}`)

  }

  GetNeersteDonar(object:any):any{
    
    return this.http.post(`${environment.APIURL}/DonationRequest/GetNeersteDonarByLocation`, object)

  }

  GetNeersteNeedy(object:any){
    return this.http.post(`${environment.APIURL}/NeedRequest/GetNeersteNeedyByLocation`, object)

  }


}
