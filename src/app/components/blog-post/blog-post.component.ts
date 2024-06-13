import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentfulServiceService } from '../../services/contentful-service.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent {

  blogPosts$ : Observable<any> | undefined

  constructor(private route: ActivatedRoute, private contentfulService: ContentfulServiceService) {}

  ngOnInit(): void {

  }

}
