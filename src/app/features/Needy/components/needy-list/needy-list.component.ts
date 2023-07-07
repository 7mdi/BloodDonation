import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NeedyService } from '../../services/needy.service';
import { NeedRequest } from '../../_models/needy-request';
declare var window:any;

@Component({
  selector: 'app-needy-list',
  templateUrl: './needy-list.component.html',
  styleUrls: ['./needy-list.component.scss','./style.css']
})
export class NeedyListComponent implements OnInit{
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  openChat:boolean;
  user:any | undefined;
  Needy:any[]=[];
  NeedyById:NeedRequest | undefined;
  NeedyByTypee:any[]=[];
  typeBlood:string =" ";
  formModel:any;
  act:string="active"
  className:string=""
  currPid:number=0;
  fullscreenImageStyles: any;
  fullscreenImageUrl!: string;
  constructor(private activatedRoute:ActivatedRoute,private needyService:NeedyService) {
    this.openChat= false;
    this.Needy = []; // Initialize with your actual data
    this.currentPage = 1;
    this.itemsPerPage = 6; // Number of items to display per page
    this.totalItems = this.Needy.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
   }

  ngOnInit(): void {
    this.currPid = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    // console.log(this.currPid)
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    this.fullscreenImageStyles = { display: 'none' };
    // this.getAllNeedy()
    // this.getNeedyByBloodType()
    this.getNeedyBySection()
  }

  getAllNeedy(){

    const observer = { 
      next: (res: any) => {
        this.Needy=res.response;
        // console.log("data",this.Needy) 
        this.totalItems = this.Needy.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) 
      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }

    this.needyService.getAllNeedyRequest().subscribe(observer);
  }

  getNeedyByBloodType(type:string){
    this.typeBlood = type;
    console.log("Type",this.typeBlood) 
    const observer = { 
      next: (res: any) => {
        this.Needy=res.response;
        // console.log("dataByType",this.Needy) 
        this.totalItems = this.Needy.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) 
      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }

    this.needyService.getNeedyRequestByBloodType(type,this.currPid).subscribe(observer);
  }

  getNeedyById(id:number){
    console.log("dataById",id) 
    const observer = { 
      next: (res: any) => {
        this.NeedyById=res.response;
        console.log("dataById",this.NeedyById) 
        
      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }

    this.needyService.getNeedyRequestById(id).subscribe(observer);
  }

  getNeedyBySection(){
    const observer = { 
      next: (res: any) => {
        this.Needy=res.response;
        // console.log("dataById",this.Needy) 
        this.totalItems = this.Needy.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) 
        
      },
      error: (err: Error) => { 
        console.log(err.message) 
      }
    }

    this.needyService.getNeedyRequestBySectionId(this.currPid).subscribe(observer);
  }

  openModel(){
    this.formModel.show();
  }

  closeModel(){
    this.formModel.hide();
  }

  openChatWindow(userId:string){
    this.openChat= true;
    this.needyService.getUser(userId).subscribe((result)=>{
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
    return this.Needy.slice(startIndex, endIndex);
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
