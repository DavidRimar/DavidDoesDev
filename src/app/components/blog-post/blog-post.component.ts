import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ContentfulServiceService } from '../../services/contentful-service.service';
import { BlogPost } from '../../models/blog-post.model';
import { BlogPostContent } from '../../models/blog-post-content.model';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  blogPost$: Observable<BlogPost> | undefined;
  blogPostContent$: Observable<BlogPostContent> | undefined;

  constructor(
    private route: ActivatedRoute,
    private contentfulService: ContentfulServiceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.blogPost$ = this.contentfulService.getById(id).pipe(
        tap(entry => console.log('Raw API response:', entry)), // Log the raw response

        map((entry: any) => {
          return {
            title: entry.fields.title || 'No title',
          } as BlogPost;
        }),
      );


      this.blogPostContent$ = this.contentfulService.getContentById(id).pipe(
        tap(entry => console.log('Raw API CONTENT:', entry)), // Log the raw response

        map((entry: any) => {
          return {
            content: entry || 'No content',
          } as BlogPostContent;
        }),
      );

      // Debug: Log emitted values
      this.blogPostContent$.subscribe(blog => {
        console.log('Blog post emitted:', blog);
      });
    });
  }

  private mapToBlogPost(response: any): BlogPost {
    return {
      id: response.sys.id,
      title: response.fields.title || 'No title', // Handle missing fields
      content: response.fields.content || 'No content', // Handle missing fields
    } as BlogPost;
  }
}
