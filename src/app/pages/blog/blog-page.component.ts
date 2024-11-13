import { Component, OnInit } from '@angular/core';
//import { ContentfulServiceService } from '../../services/contentful-service.service';
//import { Observable } from 'rxjs';
//import { BlogPost } from '../../models/blog-post.model';
import { ActivatedRoute } from '@angular/router';
//import { Button } from '../../components/button/button.component'

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})

export class BlogPageComponent implements OnInit {

  urlHandle!: string;
  backUrl: string = "/";

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.urlHandle = params['urlHandle'];
    });
  }
}
