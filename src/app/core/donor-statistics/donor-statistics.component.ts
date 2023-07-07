import { Component, OnInit } from '@angular/core';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-donor-statistics',
  templateUrl: './donor-statistics.component.html',
  styleUrls: ['./donor-statistics.component.scss','./style.css']
})
export class DonorStatisticsComponent implements OnInit {
  Donar:any[]=[];
  A1:number=0
  A2:number=0
  B1:number=0
  B2:number=0
  AB1:number=0
  AB2:number=0
  O1:number=0
  O2:number=0
  constructor(private service:CoreService) { 
  }

  ngOnInit(): void {
    this.getDonarsByBloodTypeA1()
    this.getDonarsByBloodTypeA2()
    this.getDonarsByBloodTypeB1()
    this.getDonarsByBloodTypeB2()
    this.getDonarsByBloodTypeAB1()
    this.getDonarsByBloodTypeAB2()
    this.getDonarsByBloodTypeO1()
    this.getDonarsByBloodTypeO2()
  }

  getDonarsByBloodTypeA1(){
    const type = '-A'
   this.service.getNumberOfRequestForEachType(type).subscribe((result)=>{
    this.Donar= result.response;
    this.A1 = this.Donar.length
    console.log("Done!")
   });
   console.log("Error!")
  }

  getDonarsByBloodTypeA2(){
    const type = '+A'
   this.service.getNumberOfRequestForEachType(type).subscribe((result)=>{
    this.Donar= result.response;
    this.A2 = this.Donar.length
    console.log("Done!")
   });
   console.log("Error!")
  }  

  getDonarsByBloodTypeB1(){
    const type = '-B'
   this.service.getNumberOfRequestForEachType(type).subscribe((result)=>{
    this.Donar= result.response;
    this.B1 = this.Donar.length
    console.log("Done!")
   });
   console.log("Error!")
  }  

  getDonarsByBloodTypeB2(){
    const type = '+B'
   this.service.getNumberOfRequestForEachType(type).subscribe((result)=>{
    this.Donar= result.response;
    this.B2 = this.Donar.length
    console.log("Done!")
   });
   console.log("Error!")
  }  

  getDonarsByBloodTypeAB1(){
    const type = '-AB'
   this.service.getNumberOfRequestForEachType(type).subscribe((result)=>{
    this.Donar= result.response;
    this.AB1 = this.Donar.length
    console.log("Done!")
   });
   console.log("Error!")
  }  

  getDonarsByBloodTypeAB2(){
    const type = '+AB'
   this.service.getNumberOfRequestForEachType(type).subscribe((result)=>{
    this.Donar= result.response;
    this.AB2 = this.Donar.length
    console.log("Done!")
   });
   console.log("Error!")
  }  

  getDonarsByBloodTypeO1(){
    const type = '-O'
   this.service.getNumberOfRequestForEachType(type).subscribe((result)=>{
    this.Donar= result.response;
    this.O1 = this.Donar.length
    console.log("Done!")
   });
   console.log("Error!")
  }  

  getDonarsByBloodTypeO2(){
    const type = '+O'
   this.service.getNumberOfRequestForEachType(type).subscribe((result)=>{
    this.Donar= result.response;
    this.O2 = this.Donar.length
    console.log("Done!")
   });
   console.log("Error!")
  }


}
