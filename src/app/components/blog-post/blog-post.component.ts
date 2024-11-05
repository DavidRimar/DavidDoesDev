import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

  //title: string = "";
  blogPost$: Observable<BlogPost> | undefined;
  blogPostContent$: Observable<BlogPostContent> | undefined;

  constructor(
    private contentfulService: ContentfulServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {

      this.blogPost$ = this.contentfulService.getByUrlHandle(this.urlHandle).pipe(

        map((entry: any) => {
          //this.title = entry.fields.title || '404'
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

       // Update the URL to use the title instead of the elephantId on the server side
       //if (isPlatformServer(this.platformId)) {
        // this.router.navigateByUrl(`/blog/${this.title}`, { replaceUrl: true });
      //}
  }

  private mapToBlogPost(response: any): BlogPost {
    return {
      id: response.sys.id,
      title: response.fields.title || 'No title', // Handle missing fields
      content: response.fields.content || 'No content', // Handle missing fields
    } as BlogPost;
  }
}
