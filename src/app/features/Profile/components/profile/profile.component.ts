import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/features/Authentication/helpers/validationform';
import { AuthService } from 'src/app/features/Authentication/services/auth.service';
import { UserStoreService } from 'src/app/features/Authentication/services/user-store.service';
import { DonationService } from 'src/app/features/Donation/services/donation.service';
import { NeedyService } from 'src/app/features/Needy/services/needy.service';
import { ProfileService } from '../../services/profile.service';
declare var window:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userName : string = "";
  public email : string = "";
  allDonationRequest:any[]=[];
  allAllNeedyRequest:any[]=[];
  public changePasswordForm!: FormGroup;
  formModel:any;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  public userId : string="";
  public user: any;
  constructor(private fb: FormBuilder
             ,private authService:AuthService
             ,private donationService:DonationService
             ,private userService:UserStoreService
             ,private profileService:ProfileService
             ,private needyService:NeedyService
             ) { }

  ngOnInit(): void {
    this.getUserName();
    this.getEmail();
    this.getUserId();
    this.getUser();
    this.changePasswordForm = this.fb.group({
      email: [this.email, Validators.required],
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
  }

  getUserName(){
    this.userService.getUserNameFromStore()
    .subscribe(val=>{
      const userNameFromToken = this.authService.getUserNameFromToken();
      this.userName = val || userNameFromToken
    });
  }

  getEmail(){
    this.userService.getEmailFromStore()
    .subscribe(val=>{
      const emailFromToken = this.authService.getEmailFromToken();
      this.email = val || emailFromToken
    });
  }

 getAllDonationRequest(){
  const observer = { 
    next: (res: any) => {
      this.allDonationRequest=res.response;
      console.log("allDonationRequest",this.allDonationRequest)      
    },
    error: (err: Error) => { 
      console.log(err.message) 
    }
  }

  this.donationService.getAllDonationRequestByUser(this.email).subscribe(observer);

 }

 getAllNeedyRequest(){
  const observer = { 
    next: (res: any) => {
      this.allDonationRequest=res.response;
      console.log("allNeedyRequest",this.allDonationRequest)      
    },
    error: (err: Error) => { 
      console.log(err.message) 
    }
  }

  this.needyService.getAllNeedyRequestByUser(this.email).subscribe(observer);
 }

 changePasswordFun(){
  alert(this.changePasswordForm.value)
  if (this.changePasswordForm.valid) {
    console.log(this.changePasswordForm.value);
    this.userService.changePassword(this.changePasswordForm.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err?.error.message);
      },
    });
  } else {
    ValidateForm.validateAllFormFields(this.changePasswordForm);
  }
 }

 openModel(){
  this.formModel.show();
}

closeModel(){
  this.formModel.hide();
}

hideShowPass() {
  this.isText = !this.isText;
  this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
  this.isText ? (this.type = 'text') : (this.type = 'password');
}

getUser(){
  const observer = { 
    next: (res: any) => {
      this.user=res.response;
      console.log("user is ",this.user)
    },
    error: (err: Error) => { 
      console.log(err.message) 
    }
  }

  this.profileService.getUserInformation(this.userId).subscribe(observer);
}

getUserId(){
  this.userService.getUserIdFromStore()
  .subscribe(val=>{
    const userIdFromToken = this.authService.getUserIdFromToken();
    this.userId = val || userIdFromToken
  });
}

}
