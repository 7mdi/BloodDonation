import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: signalR.HubConnection | undefined;
  baseUrl =environment.baseUrl;
  constructor(private http:HttpClient) { }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.baseUrl}/Notify`)
      .build();
    this.hubConnection.serverTimeoutInMilliseconds = 300000;
    this.hubConnection.start().then(() => {
      console.log("Connection Start");
    }).catch((err: any) => console.log(err));
  }

  public onDisconnected(callback: () => void): void {
    this.hubConnection!.onclose(callback);
  }

  public stopConnection(): void {
    this.hubConnection!.stop().then(() => {
      console.log("Connection Stop !");
    }).catch((err: any) => console.log(err));
  }

  public signalRListener = (methodName:string, callback: (...Input:any[]) => void) => {
    this.hubConnection?.on(methodName, callback);
   }

















  Get(endPoint:string):Observable<any>{
    return this.http.get(`${this.baseUrl}${endPoint}`);
  }

  GetConv(id:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/Chat/GetConversation/${id}`);
  }


  Post(body: any = null ):Observable<any>{
    
    let token = this.getToken();
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + token
    });
    return this.http.post(`${this.baseUrl}/Chat/SendMessage/`,body,{ headers });
  }

  DeleteMessage(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/Chat/DeleteMessage?Id=${id}`);
  }


  // Delete(endPoint:string,body:any = null):Observable<any>{
  //   return this.http.delete(`${this.baseUrl}${endPoint}`,body);
  // }

  // Put (endPoint:string,body:any = null):Observable<any>{
  //   return this.http.put(`${this.baseUrl}${endPoint}`,body);
  // }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

}
