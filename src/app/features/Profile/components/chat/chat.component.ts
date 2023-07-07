import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/Authentication/services/auth.service';
import { UserStoreService } from 'src/app/features/Authentication/services/user-store.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  users!:any[];
  public userName : string = "";
  public Allusers:any = [];
  user!:any;
  constructor(private http:ChatService,private authService : AuthService,private userService:UserStoreService) { }

  ngOnInit(): void {
    this.getUserName();
    this.http.Get("/User/GetAllFriends").subscribe(res=>{
      console.log(res);
      this.users = res.data;
      this.user = this.users[0];
    })
  }

  Caht(user:any){
    this.user = user;
    console.log(this.user)
  }

  getUserName(){
    this.userService.getUserNameFromStore()
    .subscribe(val=>{
      const userNameFromToken = this.authService.getUserNameFromToken();
      this.userName = val || userNameFromToken
    });
  }

}
