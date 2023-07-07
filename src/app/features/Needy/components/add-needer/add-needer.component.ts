import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CoreService } from 'src/app/core/services/core.service';
import { AuthService } from 'src/app/features/Authentication/services/auth.service';
import { UserStoreService } from 'src/app/features/Authentication/services/user-store.service';
import { NeedyService } from '../../services/needy.service';
import { NeedRequest } from '../../_models/needy-request';
import { NotificationService } from 'src/app/features/Profile/services/notification.service';
declare var window:any;

@Component({
  selector: 'app-add-needer',
  templateUrl: './add-needer.component.html',
  styleUrls: ['./add-needer.component.scss']
})
export class AddNeederComponent implements OnInit {
  a:number = 30.098
  b:number = 31.098
  c:number = 0
  d:string = "A-"
  e:number = 1

  x:number = 19.098
  y:number = 20.098
  notifiToUserId:string=''
  location_lat: any;
  location_lng: any;
  formModel:any;
  sections:any[]=[];
  center: google.maps.LatLngLiteral | undefined;
  public neederForm!: FormGroup;
  bloodTypeList:any[];
  public userId : string = ""
  showValue:boolean = true
  newOrder:NeedRequest= {} as NeedRequest;
  static notifiToUserId: string;
  constructor(private notificationService: NotificationService,private location:Location, private authService:AuthService,private needyService:NeedyService,private userService:UserStoreService,private coreService:CoreService,private fdonar: FormBuilder, private toast: NgToastService,private router: Router) {
    this.bloodTypeList =
      [
        { id: 1, name: '- A', val: '-A'   },
        { id: 2, name: '+ A', val: '+A'   },
        { id: 3, name: '- B', val: '-B'   },
        { id: 4, name: '+ B', val: '+B'   },
        { id: 5, name: '- AB', val: '-AB' },
        { id: 6, name: '+ AB', val: '+AB' },
        { id: 7, name: '- O', val: '-O'   },
        { id: 8, name: '+ O', val: '+O'   }     
     ]; 

   }

   ngOnInit(): void { 
    this.getNearestDonorFromMachine(this.a,this.b,this.c,this.d,this.e)
    // this.getNearestDonor(this.x,this.y)   
    this.getAllSections()
    this.getUserId()
    this.notificationService.startConnection(this.userId); 
    this.newOrder.applicationUserId=this.userId;
    console.log(this.userId)
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
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    this.formModel.show();
    this.notificationService.signalRListener("SendToAllUsers", (...Input: any[]) => {
      console.log("Received data:", Input);
      this.notificationService.notify(Input);
    });
    this.notificationService.signalRListener("ReceiveNotification", (...Input: any[]) => {
      console.log("Received data:", Input);
      this.notificationService.notify(Input);
    });

  }

  onSubmit(){
    this.newOrder.latitude = this.location_lat;
    this.newOrder.longitude = this.location_lng;
    console.log("Order", this.newOrder);
    const observer = {
      next: (req: NeedRequest) => {
        alert("Request added.!")
        this.formModel.hide();
        // this.getNearestDonorFromMachine(this.newOrder.longitude!,this.newOrder.latitude!,0,this.newOrder.bloodType!,this.newOrder.sectionId!)
        this.router.navigate(['/needers', this.newOrder.sectionId]);
        this.sendNotificationToAllUsers()
      },
      error: (err: Error) => { console.log(err.message) }
    }

    this.needyService.addRequest(this.newOrder).subscribe(observer)

    console.log("Form",this.newOrder)
  }

  getUserId(){
    this.userService.getUserIdFromStore()
    .subscribe(val=>{
      const userIdFromToken = this.authService.getUserIdFromToken();
      this.userId = val || userIdFromToken
    });
  }

  getAllSections(){

    const observer = { 
      next: (res: any) => {
        this.sections=res.response;
        console.log("data",this.sections) 
        
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

  //will call this fun in notifi popup in close and submit with new current!!
  getNearestDonorFromMachine(longitude:number, latitude:number, current:number, bloodType:string, donatType:number){
    const observer = {
      next: (res: any) => { 
        console.log("Machine",res)
        // this.getNearestDonor(res.Latitude,res.Longitude)
      },
      error: (err: Error) => { console.log(err.message) }
    }

    this.needyService.post(longitude, latitude, current, bloodType, donatType).subscribe(observer)

  }

  getNearestDonor(latitude: number, longitude: number) {

    const observer = {
      next: (res: any) => { 
        console.log("data",res)
        console.log("applicationUserId",res.applicationUserId)
        const y ="0f01952a-191e-4ddd-8a5f-cabc785f8228"
        this.notifiToUserId=res.applicationUserId
        this.notificationService.setValue(y,res.id)
        this.showValue = true        
        this.sendNotificationToUser(y)
      },
      error: (err: Error) => { console.log(err.message) }
    }

    this.needyService.GetNeersteDonar(longitude,latitude).subscribe(observer)

  }


  sendNotificationToAllUsers() {
    const message = 'Someone need blood.if you want to donate, call '+ this.newOrder.phone ;
    this.notificationService.sendNotificationToAllUsers(message);
  }
  sendNotificationToUser(id:string) {
    console.log("iiiiid",id)
    const message = 'Hello, user!';
    const userId = '0f133edd-388b-4866-8eab-3e1e2fb78e61';
    this.notificationService.sendNotificationToUser(id, message);   
  }


  handleValue(value:number){
    console.log("dataaa",value)

  }

}
