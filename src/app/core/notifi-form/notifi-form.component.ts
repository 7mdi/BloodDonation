import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/Authentication/services/auth.service';
import { UserStoreService } from 'src/app/features/Authentication/services/user-store.service';
import { NeedyService } from 'src/app/features/Needy/services/needy.service';

@Component({
  selector: 'app-notifi-form',
  templateUrl: './notifi-form.component.html',
  styleUrls: ['./notifi-form.component.scss']
})
export class NotifiFormComponent implements OnInit {
  @Input() show:boolean = false
  @Input() receiveId:string ='' 
  @Input() order!:number 
  @Output() newQuantity = new EventEmitter<number>();
  userId:string =''
  formQuantity: FormGroup;
  constructor(private authService:AuthService,private userService:UserStoreService,private needyService:NeedyService) {
    this.formQuantity = new FormGroup({
      quantity: new FormControl('', [Validators.required, Validators.pattern('[1-2]{1,1}')])
    });
    this.getUserId()
   }

  ngOnInit(): void {
    
  }

  clocePopup(){
    this.show = false
  }

  closeOverLay(e:any){
    if(e.target.classList.contains('over-lay')){
      this.show= true
    }
  }

  submit(){
    console.log("Quantity",this.formQuantity.value.quantity)
    console.log("Order",this.order)
    this.newQuantity.emit(this.formQuantity.value.quantity);

    this.needyService.editNeedyRequestQuantity(this.formQuantity.value.quantity,this.order).subscribe(
      (res) => { console.log("Quantity Edited!")}, 
      (error) => { console.log("Error!")});
  }

  getUserId(){
    this.userService.getUserIdFromStore()
    .subscribe(val=>{
      const userIdFromToken = this.authService.getUserIdFromToken();
      this.userId = val || userIdFromToken
    });
  }

  test(){
    console.log("IsShow", this.show)
    console.log("UserId", this.userId)
    console.log("receiveId", this.receiveId)
  }

}









