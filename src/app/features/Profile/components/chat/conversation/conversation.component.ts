import { AfterViewChecked, Component, ElementRef, Input, OnChanges, OnInit, ViewChild  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HubConnection } from '@microsoft/signalr';
import * as signalr from '@microsoft/signalr';
import { AuthService } from 'src/app/features/Authentication/services/auth.service';
import { UserStoreService } from 'src/app/features/Authentication/services/user-store.service';
import { environment } from 'src/environments/environment';
import { ChatService } from '../../../services/chat.service';
import { NotificationService } from '../../../services/notification.service';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit ,OnChanges,AfterViewChecked{

  @ViewChild('panel') panel!:ElementRef;
  @Input() user!:any;
  con!:any[];
  private HubConnection!:HubConnection;
  notifications:any;
  SendForm:FormGroup = new FormGroup(
    {

      senderId:new FormControl(null,[Validators.required]),
      reciverId:new FormControl(null,[Validators.required]),
      content: new FormControl(null,[Validators.required])
    }
  ) ;
  public userId : string = "";
  constructor(private chat : ChatService, private authService:AuthService, private userService:UserStoreService, private notificationService: NotificationService) {
    this.getUserId()
   }
   ngAfterViewChecked(): void {

    this.panel.nativeElement.scrollTop = this.panel?.nativeElement.scrollHeight;
  }


  ngOnChanges(): void {
    // console.log(this.user) ;
    if (this.user != null) {
      this.SendForm.controls['senderId'].setValue(this.userId);
      this.SendForm.controls['reciverId'].setValue(this.user.id);
      this.chat.Get(`/Chat/GetConversation/${this.user?.id}`).subscribe(res=>{
        this.con = res
        console.log(this.con);
      })

    }
  }

 ngOnInit(): void {
    this.getUserId()

    this.HubConnection = new signalr.HubConnectionBuilder().withUrl(`${environment.baseUrl}/Notify`).build();
    this.HubConnection
    .start().then(()=>{
      console.log("Start");
    }).catch((err)=>{
      console.log(err);
    })

    // this.HubConnection
    // .onclose(()=>{
    //   setTimeout(() => {
    //     console.log("Restart");
    //     this.HubConnection
    // .start().then(()=>{
    //   console.log("Start");
    // }).catch((err)=>{
    //   console.log(err);
    // })
    //   }, 5000);
    // })


    this.HubConnection.on("ReciveMessage",((data:any)=>{
      console.log("Recive Message 1",data);
      if (this.userId == data.reciverId || this.userId == data.senderId) {       
         console.log("Recive Message",data);
        this.chat.Get(`/Users/GetConversation/${this.user?.id}`).subscribe(res=>{
          this.con = res
          console.log(this.con);
        })
      }
    }))

  }



  Send(SendFrom:FormGroup){
    console.log(SendFrom.value);
    this.chat.Post(SendFrom.value).subscribe(res=>{
      console.log(res);
      SendFrom.controls['content'].setValue('');
      // this.chat.Get(`/Chat/GetConversation/${this.user?.id}`).subscribe(res=>{
      //   this.con = res
      //   console.log(this.con);
      // })
    })
  }

  getUserId(){
    this.userService.getUserIdFromStore()
    .subscribe(val=>{
      const userIdFromToken = this.authService.getUserIdFromToken();
      this.userId = val || userIdFromToken
    });
  }
  Delete(id:number){
    this.chat.DeleteMessage(id).subscribe((result)=>{
      console.log("deleted.!")
     });
  }

}
