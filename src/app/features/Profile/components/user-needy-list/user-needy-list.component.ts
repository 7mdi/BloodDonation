import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoreService } from 'src/app/core/services/core.service';
import { AuthService } from 'src/app/features/Authentication/services/auth.service';
import { UserStoreService } from 'src/app/features/Authentication/services/user-store.service';
import { NeedyService } from 'src/app/features/Needy/services/needy.service';
import { NeedRequest } from 'src/app/features/Needy/_models/needy-request';
declare var window:any;

@Component({
  selector: 'app-user-needy-list',
  templateUrl: './user-needy-list.component.html',
  styleUrls: ['./user-needy-list.component.scss']
})
export class UserNeedyListComponent implements OnInit {
  allAllNeedyRequest:any[]=[];
  public email : string = "";
  NeedyById:NeedRequest= {} as NeedRequest;
  editOrder:NeedRequest= {} as NeedRequest;
  bloodTypeList:any[];
  public userId : string = "";
  sections:any[]=[];
  detailsModel:any;
  editModel:any;
  idNeederEdit:number=0;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  fullscreenImageStyles: any;
  fullscreenImageUrl!: string;
  constructor(private authService:AuthService,private needyService:NeedyService,private coreService:CoreService,private userService:UserStoreService) {
    
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
   this.allAllNeedyRequest = []; // Initialize with your actual data
   this.currentPage = 1;
   this.itemsPerPage = 5; // Number of items to display per page
   this.totalItems = this.allAllNeedyRequest.length;
   this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  ngOnInit(): void {
    this.getEmail()
    this.getUserId()
    this.getAllSections()
    this.getAllNeedyRequest()
    this.editOrder.applicationUserId=this.userId;
    console.log("Data111",this.getAllNeedyRequest)
    this.detailsModel = new window.bootstrap.Modal(
      document.getElementById("detailsModel")
    );
    this.editModel = new window.bootstrap.Modal(
      document.getElementById("editModel")
    );
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

  getAllNeedyRequest(){
    const observer = { 
      next: (res: any) => {
        this.allAllNeedyRequest=res.response.result;
        // console.log("allNeedyRequest",this.allAllNeedyRequest)  
      this.totalItems = this.allAllNeedyRequest.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage)   

      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }
  
    this.needyService.getAllNeedyRequestByUser(this.email).subscribe(observer);
  
   }
   
   deleteNeederRequest(id:number){
    alert(id)
    const observer = { 
      next: (res: any) => {
        console.log(res.response) 
        alert(res.response)
      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }
  
    this.needyService.deleteNeedyRequestByUser(id).subscribe(observer);
  
   }

   getNeedyById(id:number){
    console.log("dataById",id) 
    const observer = { 
      next: (res: any) => {
        this.NeedyById=res.response;
        this.idNeederEdit=id
        console.log("dataById",this.NeedyById)       
      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }
    this.needyService.getNeedyRequestById(id).subscribe(observer);
  }

  updateData(dataForm: NgForm){
    this.editOrder.ssn = dataForm.value.ssn;
    this.editOrder.firstName= dataForm.value.firstName;
    this.editOrder.lastName= dataForm.value.lastName;
    this.editOrder.age= dataForm.value.age;
    this.editOrder.bloodType= dataForm.value.bloodType;
    this.editOrder.gender= dataForm.value.flexRadioDefault;
    this.editOrder.phone= dataForm.value.Phone;
    this.editOrder.location= dataForm.value.location;
    this.editOrder.hospitalReport= dataForm.value.hospitalReport;
    this.editOrder.quantity= dataForm.value.quantity;
    this.editOrder.date= dataForm.value.date;
    this.editOrder.sectionId= dataForm.value.Donation;


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

   this.needyService.editNeedyRequestByUser(this.idNeederEdit,this.editOrder).subscribe(observer);
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
    return this.allAllNeedyRequest.slice(startIndex, endIndex);
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

  showFullScreenImage(image: any) {
    this.fullscreenImageUrl = image.src;
    this.fullscreenImageStyles = { display: 'block' };
  }

  closeFullScreenImage() {
    this.fullscreenImageStyles = { display: 'none' };
  }

}
