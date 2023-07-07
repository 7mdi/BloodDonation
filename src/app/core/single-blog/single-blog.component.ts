import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})
export class SingleBlogComponent implements OnInit {
  currBid:number=0;
  blogsById:any | undefined;
  constructor(private activatedRoute:ActivatedRoute,private service:CoreService) { }

  ngOnInit(): void {
    this.currBid = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    console.log("id",this.currBid)
    this.getBlogs()
  }

  getBlogs(){
    this.service.getBlogById(this.currBid).subscribe((result)=>{
      this.blogsById = result.response;
      console.log(this.blogsById);
    });
  }
  
}
