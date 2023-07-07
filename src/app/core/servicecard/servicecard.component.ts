import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-servicecard',
  templateUrl: './servicecard.component.html',
  styleUrls: ['./servicecard.component.scss']
})
export class ServicecardComponent implements OnInit {
  sections: any[] = [];
  constructor(private coreService: CoreService, private router: Router) { }

  ngOnInit(): void {
    this.getAllSections()
  }


  getAllSections() {

    const observer = {
      next: (res: any) => {
        this.sections = res.response;
        console.log("data", this.sections)

      },
      error: (err: Error) => {
        console.log(err.message)
      }
    }

    this.coreService.getAllSections().subscribe(observer);
  }


  openNeedersList(id: number) {
    this.router.navigate(['/Needers', id]);
  }
  openDonarsList() {
    this.router.navigate(['/Donars']);
  }
}
