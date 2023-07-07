import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NotificationService } from './features/Profile/services/notification.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges{
  title = 'BloodWebsite';
  currentRoute:string =" ";
  center: google.maps.LatLngLiteral | undefined;
  receivedNotifications: string[]=[];
  someKey:string='0f133edd-388b-4866-8eab-3e1e2fb78e61'
  showValue:boolean = true
  receivedValue!: string
  orderId!: number

  x:any[]=[];
  constructor(private router: Router,private location :Location,private toast: NgToastService,private notificationService: NotificationService) 
  {   }
  ngOnChanges(changes: SimpleChanges): void {
    // this.receivedValue = this.notificationService.getValue();
    // console.log("iddddddddddddddddd",this.receivedValue)
  }
  
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
    this.currentRoute= this.router.url;
    console.log("Url", this.currentRoute)
    
    this.notificationService.onNotification()
    .subscribe(notifications => {
      this.receivedNotifications = notifications;
      let i =0;
      for (const notification of notifications) {
        this.x[i]=notification
        this.receivedValue = this.notificationService.getUserTdNotifi();
        this.orderId = this.notificationService.getOrderId();
        console.log("idUserNotifi",this.receivedValue)
        this.sent()
        this.toast.info({ detail: '', summary: notification, duration: 15000 });
        i++;
      }
    });
  }


  goBack() {
    this.location.back();
  }

  sent(){

  }

  handleValue(value:number){
    console.log("appconmponant",value)
  }



  // this.notifications

}
