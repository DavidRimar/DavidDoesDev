import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentfulServiceService } from '../../services/contentful-service.service';
import { BlogPost } from '../../models/blog-post.model';
import { BlogPostContent } from '../../models/blog-post-content.model';
import { Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class BlogPostComponent implements OnInit {

  @Input() urlHandle!: string;

  blogPost$: Observable<BlogPost> | undefined;
  blogPostContent$: Observable<BlogPostContent> | undefined;

  constructor(
    private contentfulService: ContentfulServiceService
  ) {}

  ngOnInit(): void {

      this.blogPost$ = this.contentfulService.getByUrlHandle(this.urlHandle).pipe(

        map((entry: any) => {
          return {
            title: entry.fields.title || 'No title',
          } as BlogPost;
        }),
      );


      this.blogPostContent$ = this.contentfulService.getContentByUrlHandle(this.urlHandle).pipe(

        map((entry: any) => {
          return {
            content: entry || 'No content',
          } as BlogPostContent;
        }),
      );
  }
}
