import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/Authentication/services/auth.service';
import { UserStoreService } from 'src/app/features/Authentication/services/user-store.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public notifiyForm!: FormGroup;
  show = false;
  notifications: any;
  public userId: string = "";
  receiveId: string = '07d43bd3-48f0-4e93-ae65-1c70581ba708'
  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserStoreService, private notificationService: NotificationService) {
    this.getUserId()
  }

  // ngOnChanges(): void {
    // console.log(this.user) ;

    // this.notificationService.signalRListener("SendToAllUsers", (...Input: any[]) => {
    //   console.log("Received data:", Input);
    //   this.notifications = Input;     
    // });
    // this.notificationService.signalRListener("ReceiveNotification", (...Input: any[]) => {
    //   console.log("Received data:", Input);
    //   this.notifications = Input;     
    // });
  // }

  ngOnInit(): void {
    this.getUserId()
    this.notificationService.startConnection(this.userId);
   
    this.notificationService.signalRListener("SendToAllUsers", (...Input: any[]) => {
      console.log("Received data:", Input);
      
      this.notificationService.notify(Input);

      
    });
    

    this.notificationService.signalRListener("ReceiveNotification", (...Input: any[]) => {
      console.log("Received data:", Input);
      //this.show = true;
      this.notifications = Input;
      this.notificationService.notify(Input);
      this.notificationService.formSubject.subscribe(e=>{
        this.show = true;
      });

    });
  }

  getUserId() {
    this.userService.getUserIdFromStore()
      .subscribe(val => {
        const userIdFromToken = this.authService.getUserIdFromToken();
        this.userId = val || userIdFromToken
      });
  }

  // sendNotificationToUser() {
  //   const message = 'Hello, user!';
  //   const userId = '0f01952a-191e-4ddd-8a5f-cabc785f8228';
  //   alert("step1")
  //   this.notificationService.sendNotificationToUser(userId, message);
  //   alert("step3")
  // }

  sendNotificationToUser() {
    this.show=true
    const message = 'Hello, user!';
    // const userId = '07d43bd3-48f0-4e93-ae65-1c70581ba708';
    this.notificationService.sendNotificationToUser(this.receiveId, message);
  }

  sendNotificationToAllUsers() {
    const message = 'Hello, everyone!' + this.userId + 'hi';
    this.notificationService.sendNotificationToAllUsers(message);
  }

  ngOnDestroy(): void {
    this.notificationService.onDisconnected(() => {
      console.log('SignalR connection disconnected');
    });
  }


  handleValue(value: number) {
    console.log('Received value:', value);
  }

}