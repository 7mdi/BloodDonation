import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { CoreService } from 'src/app/core/services/core.service';
import { AuthService } from 'src/app/features/Authentication/services/auth.service';
import { UserStoreService } from 'src/app/features/Authentication/services/user-store.service';
import { DonationService } from '../../services/donation.service';
import { DonationRequest } from '../../_models/donation-request';
import { NotificationService } from 'src/app/features/Profile/services/notification.service';
declare var window:any;

@Component({
  selector: 'app-add-donar',
  templateUrl: './add-donar.component.html',
  styleUrls: ['./add-donar.component.scss']
})
export class AddDonarComponent implements OnInit {
  location_lat: any;
  location_lng: any;
  sections:any[]=[];
  bloodTypeList:any[];
  center: google.maps.LatLngLiteral | undefined;
  newOrder:DonationRequest= {} as DonationRequest;
  public userId : string = "";
  formModel:any;
  notifications:any;
  constructor(private notificationService: NotificationService,private location:Location, private authService:AuthService,private userService:UserStoreService,private coreService:CoreService,private donationService:DonationService, private toast: NgToastService,private router: Router) {
    this.bloodTypeList =
      [
        { id: 1, name: '-A', val: '-A'   },
        { id: 2, name: '+A', val: '+A'   },
        { id: 3, name: '-B', val: '-B'   },
        { id: 4, name: '+B', val: '+B'   },
        { id: 5, name: '-AB', val: '-AB' },
        { id: 6, name: '+AB', val: '+AB' },
        { id: 7, name: '-O', val: '-O'   },
        { id: 8, name: '+O', val: '+O'   }     
     ];  
    }

  ngOnInit(): void {    
    this.getAllSections()
    this.getUserId()
    this.newOrder.applicationUserId=this.userId;
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.location_lat = this.center.lat
      this.location_lng = this.center.lng
      // this.location_lat = this.center.lat.toString()
      // this.location_lng = this.center.lng.toString()
    });
    console.log(this.userId)
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    this.formModel.show();
    // console.log(this.newOrder)

    this.notificationService.signalRListener("SendToAllUsers", (...Input: any[]) => {
      // console.log("Received data:", Input);
      this.notificationService.notify(Input);
    });

  }

  getUserId(){
    this.userService.getUserIdFromStore()
    .subscribe(val=>{
      const userIdFromToken = this.authService.getUserIdFromToken();
      this.userId = val || userIdFromToken
    });
  }

  onSubmit(){
    this.newOrder.latitude = this.location_lat;
    this.newOrder.longitude = this.location_lng;
    console.log("Form", this.newOrder)
    const observer = {      
      next: (req: DonationRequest) => {
        this.formModel.hide();
        this.router.navigate(['/donars']);  
        this.sendNotificationToAllUsers()
      },
      error: (err: Error) => { console.log(err.message) }
    }
    this.donationService.addRequest(this.newOrder).subscribe(observer)
    // console.log("Form",this.newOrder)
  }
  
  getAllSections(){
    const observer = { 
      next: (res: any) => {
        this.sections=res.response;
        // console.log("data",this.sections) 
      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }
    this.coreService.getAllSections().subscribe(observer);
  }

  openModel(){
    this.formModel.show();
  }

  closeModel(){
    this.formModel.hide();
    // this.router.navigateByUrl('/home');
    this.location.back();
  }

  sendNotificationToAllUsers() {
    const message = 'Someone wants to donate blood.if you need blood call '+ this.newOrder.phone ;
    this.notificationService.sendNotificationToAllUsers(message);
  }

}
