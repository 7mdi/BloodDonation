import { Component, OnInit } from '@angular/core';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss', './style.css']
})
export class BlogComponent implements OnInit {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  news: any[] = [];
  constructor(private coreService: CoreService) {
    this.news = []; // Initialize with your actual data
    this.currentPage = 1;
    this.itemsPerPage = 2; // Number of items to display per page
    this.totalItems = this.news.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
   }

  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews() {
    const observer = {
      next: (res: any) => {
        this.news = res.response;
        // console.log("data", this.news)
        this.totalItems = this.news.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) 
      },
      error: (err: Error) => {
        console.log(err.message)
      }
    }
    this.coreService.getAllNews().subscribe(observer);
  }

  getPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.news.slice(startIndex, endIndex);
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
