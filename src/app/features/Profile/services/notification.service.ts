import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private hubConnection: signalR.HubConnection | undefined;
  private notificationSubject = new Subject<string[]>();
  public formSubject = new Subject<boolean>();
  public userTdNotifi!: string;
  public order!:number;
  constructor() { 
    // this.startConnection()
  }

  public startConnection = (someKey: string) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.baseUrl}/Notify?some_key=${someKey}`)
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

 public sendNotificationToUser(userId: string, message: string) {
  this.hubConnection?.invoke('SendNotification', userId, message)
    .catch(error => {
      console.error('Error sending notification:', error);
    });
}


  sendNotificationToAllUsers(message: string) {
    this.hubConnection?.invoke('SendToAll', 'all', message);
  }

  notify(notifications: string[]): void {
    this.notificationSubject.next(notifications);
    this.formSubject.next(true);
  }

  onNotification(): Observable<string[]> {
    return this.notificationSubject.asObservable();
  }


  setValue(receiveId: string,orderId:number) {
    this.userTdNotifi = receiveId;
    this.order = orderId ;
  }

  getUserTdNotifi(): string {
    return this.userTdNotifi;
  }

  getOrderId(): number {
    return this.order;
  }

}
