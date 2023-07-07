import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserStoreService } from 'src/app/features/Authentication/services/user-store.service';
import { DonationService } from '../../services/donation.service';
import { DonationRequest } from '../../_models/donation-request';

declare var window:any;

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss','./style.css']
})
export class DonationListComponent implements OnInit {
  openChat:boolean;
  user:any | undefined;
  Donars:any[]=[];
  public users:any = [];
  typeBlood:string =" ";
  formModel:any;
  currPid:number=0;
  DonarById:DonationRequest | undefined;
  isPopupOpenend : boolean = false ;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  constructor(private donationService:DonationService,private userService:UserStoreService,private activatedRoute:ActivatedRoute) {
    this.openChat= false;
    this.Donars = []; // Initialize with your actual data
    this.currentPage = 1;
    this.itemsPerPage = 6; // Number of items to display per page
    this.totalItems = this.Donars.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  ngOnInit(): void {
    this.currPid = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    this.getDonarsBySection()
    this.getAllDonars()
    this.getUsers()
  }

  getAllDonars(){
    const observer = { 
      next: (res: any) => {
        this.Donars=res.response;
        // console.log("data",this.Donars) 
        this.totalItems = this.Donars.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage)  
      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }

    this.donationService.getAllDonationRequest().subscribe(observer);
  }

  getUsers(){
    const observer = { 
      next: (res: any) => {
        this.users=res;
        // console.log("data",this.users) 
      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }
    this.userService.getAllUsers().subscribe(observer);
  }

  getDonarsBySection(){
    const observer = { 
      next: (res: any) => {
        this.Donars=res.response;
        console.log("dataById",this.Donars) 
        
      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }

    this.donationService.getAllDonationRequest().subscribe(observer);
  }

  getDonarsByBloodType(type:string){
    this.typeBlood = type;
    // console.log("Type",this.typeBlood) 
    const observer = { 
      next: (res: any) => {
        this.Donars=res.response;
        // console.log("dataByType",this.Donars) 
        this.totalItems = this.Donars.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) 
      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }
    this.donationService.getDonarsRequestByBloodType(type).subscribe(observer);
  }

  getDonarById(id:number){
    // console.log("dataById",id) 
    const observer = { 
      next: (res: any) => {
        this.DonarById=res.response;
        // console.log("dataById",this.DonarById)  
      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }

    this.donationService.getDonarRequestById(id).subscribe(observer);
  }

  openModel(){
    this.formModel.show();
  }

  closeModel(){
    this.formModel.hide();
  }

  openChatWindow(userId:string){
    this.openChat= true;
    this.donationService.getUser(userId).subscribe((result)=>{
      this.user = result.response;
      console.log(this.user);
    });
  }

  hied(){
    this.openChat= false
  }

  getPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.Donars.slice(startIndex, endIndex);
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
