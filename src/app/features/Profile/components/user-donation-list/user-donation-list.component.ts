import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoreService } from 'src/app/core/services/core.service';
import { AuthService } from 'src/app/features/Authentication/services/auth.service';
import { UserStoreService } from 'src/app/features/Authentication/services/user-store.service';
import { DonationService } from 'src/app/features/Donation/services/donation.service';
import { DonationRequest } from 'src/app/features/Donation/_models/donation-request';
import { ProfileService } from '../../services/profile.service';
declare var window:any;

@Component({
  selector: 'app-user-donation-list',
  templateUrl: './user-donation-list.component.html',
  styleUrls: ['./user-donation-list.component.scss']
})
export class UserDonationListComponent implements OnInit {
  allDonationRequest:any[]=[];
  public email : string = "";
  DonarById:DonationRequest= {} as DonationRequest;
  editOrder:DonationRequest= {} as DonationRequest;
  bloodTypeList:any[];
  public userId : string = "";
  sections:any[]=[];
  detailsModel:any;
  editModel:any;
  idDonarEdit:number=0;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  constructor(private donationService:DonationService,private coreService:CoreService,private authService:AuthService,private userService:UserStoreService,private profileService:ProfileService) { 

    this.bloodTypeList =
    [
      { id: 1, name: 'A -', val: 'A-'   },
      { id: 2, name: 'A +', val: 'A+'   },
      { id: 3, name: 'B -', val: 'B-'   },
      { id: 4, name: 'B +', val: 'B+'   },
      { id: 5, name: 'AB -', val: 'AB-' },
      { id: 6, name: 'AB +', val: 'AB+' },
      { id: 7, name: 'O -', val: 'O-'   },
      { id: 8, name: 'O +', val: 'O+'   }     
   ]; 
   this.allDonationRequest = []; // Initialize with your actual data
   this.currentPage = 1;
   this.itemsPerPage = 5; // Number of items to display per page
   this.totalItems = this.allDonationRequest.length;
   this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  ngOnInit(): void {
    this.detailsModel = new window.bootstrap.Modal(
      document.getElementById("detailsModel")
    );
    this.editModel = new window.bootstrap.Modal(
      document.getElementById("editModel")
    );
    this.getEmail()
    this.getUserId()
    this.getAllSections()
    this.getAllDonationRequest()
    this.editOrder.applicationUserId=this.userId;
    // console.log("applicationUserId id",this.editOrder.applicationUserId)
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
        // console.log("data",this.sections)      
      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }
    this.coreService.getAllSections().subscribe(observer);
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
        this.allDonationRequest=res.response.result;
        // console.log("allDonationRequest",this.allDonationRequest)      
        this.totalItems = this.allDonationRequest.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage)  
      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }
    this.donationService.getAllDonationRequestByUser(this.email).subscribe(observer);
   }

   deleteDonationRequest(id:number){
    const observer = { 
      next: (res: any) => {
        console.log(res.response) 
        // alert(res.response)
      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }
    this.donationService.deleteDonationRequestByUser(id).subscribe(observer);
   }

   getDonarById(id:number){
    console.log("dataById",id) 
    const observer = { 
      next: (res: any) => {
        this.DonarById=res.response;
        // console.log("dataById",this.DonarById) 
        this.idDonarEdit=id
        
      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }

    this.donationService.getDonarRequestById(id).subscribe(observer);
  }

  updateData(dataForm: NgForm){
     this.editOrder.ssn = dataForm.value.ssnDonar;
     this.editOrder.firstName= dataForm.value.fristName;
     this.editOrder.lastName= dataForm.value.lastName;
     this.editOrder.age= dataForm.value.ageDonar;
     this.editOrder.bloodType= dataForm.value.bloodTypes;
     this.editOrder.gender= dataForm.value.flexRadioDefault;
     this.editOrder.phone= dataForm.value.PhoneDonar;
     this.editOrder.location= dataForm.value.locDonar;
     this.editOrder.chronicDiseases= dataForm.value.chronicDonar;
     this.editOrder.startDate= dataForm.value.startDate;
     this.editOrder.endDate= dataForm.value.endDate;

    //  console.log("editOrder",this.editOrder)
    //  console.log("editOrderId",this.editOrder.id)
    //  console.log("DonarById",this.idDonarEdit)

    const observer = { 
      next: (res: any) => {
        // alert(res.response)
        console.log("rusalt",res.response) 
        this.editModel.hide()
      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }
    this.donationService.editDonationRequestByUser(this.idDonarEdit,this.editOrder).subscribe(observer);
  }

  openEditModel(){
    this.editModel.show()
  }

  closeEditModel(){
    this.editModel.hide()
  }

  openDetailsModel(){
    this.detailsModel.show();
  }

  closeDetailsModel(){
    this.detailsModel.hide();
  }

  getPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.allDonationRequest.slice(startIndex, endIndex);
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

}
