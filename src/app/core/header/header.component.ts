import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/features/Authentication/services/auth.service';
import { NotificationService } from 'src/app/features/Profile/services/notification.service';
import { TranslateConfigService } from 'src/app/shared/services/translate-config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './style.css']
})
export class HeaderComponent implements OnInit {
  currentRoute:string =" ";
  notHome:boolean= false;
  typeLang:string='en'
  receivedNotifications: string[]=[];
  currentNotifications: string[]=[];
  constructor(private router: Router, private authService: AuthService, private translateConfigService: TranslateConfigService,private toast: NgToastService,private notificationService: NotificationService) {
    }


  ngOnInit(): void {
    this.currentRoute= this.router.url;
    console.log("Url", this.currentRoute)

    this.notificationService.onNotification()
    .subscribe(notifications => {
      this.receivedNotifications = notifications;
      // Trigger any actions or display the notifications as desired
      let counter =0;
      for (const notification of notifications) {
        this.currentNotifications[counter]=notification
        this.toast.info({ detail: '', summary: notification, duration: 15000 });
        counter++;
      }
    });
  
  }
  
  ngOnChanges(): void {
    if (this.currentRoute != '/home') {
      this.notHome = true;
    }
  }

  signOut() {
    this.authService.signOut();
  }
  
  changeLanguage(type: string){
    this.translateConfigService.changeLanguage(type);
    this.typeLang=type
  }

  goBack()
  {
    // this.location.back();
  }


  showNotification(){
    for (const notification of this.currentNotifications) {
      this.toast.info({ detail: '', summary: notification, duration: 15000 });
    }
}



}
