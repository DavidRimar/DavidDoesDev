import { Component, OnInit } from '@angular/core';
//import { ContentfulServiceService } from '../../services/contentful-service.service';
//import { Observable } from 'rxjs';
//import { BlogPost } from '../../models/blog-post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})

export class BlogPageComponent implements OnInit {

  title!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.title = params['title'];
    });
  }
}
